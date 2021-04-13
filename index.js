const express = require('express')
const bodyParser = require('body-parser') //body-parser 수신 data를 파싱 하는데 사용
const cookieParser = require('cookie-parser') //cookie 를 사용하기 위해 추가
const config = require('./config/key') //config 설정
const { auth } = require("./middleware/auth")
const { User } = require("./model/User")
const mongoose = require('mongoose') //db middle ware 쿼리 없이 DB CRUD를 사용 할 수 있게 해주는 유용한 미들웨어다.


//서버 포트 3000
const app = express()
const port = 3000
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())
app.use(cookieParser())

//set db model
//set mongoose (Atlas AWS mongoDB 로 설치 함)
mongoose.connect(
    config.mongoURI, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false } //없어도 되지만 AWS 이용시 오류가 발생하면 입력해 줘야 함.
)
  .catch(err => {
      console.log(err)
      process.exit(1)
  })
  .then(() => console.log('MongoDB Conneted...'))


//set route
app.get('/', (req, res) => {
  res.send('Hello World! nodemon test')
})

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 가져와서 DB에 저장.
  const user = new User(req.body)
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스 조회
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  })

  //비밀번호 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch)
    return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
  })

  //Token 생성
  user.generateToken((err, user) => {
    if(err) return res.status(400).send(err)
    //토큰을 저장.(쿠키, 로컬, 세션)
    res.cookie("x_auth", user.token)
    .status(200)
    .json({ loginSuccess: true, userId: user._id })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
