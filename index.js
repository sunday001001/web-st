//set express
//웹서버
const express = require('express')
const app = express()
const port = 3000
//set body-parser
//수신 data를 파싱 하는데 사용
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//config 설정
const config = require('./config/key')

//set model
//db model
const { User } = require("./model/User")
//set mongoose
//db middle ware 쿼리 없이 DB CRUD를 사용 할 수 있게 해주는 유용한 미들웨어다.
//Atlas AWS mongoDB 로 설치 해 둠.
const mongoose = require('mongoose')
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
    
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
