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
//set model
//db model
const { User } = require("./model/User")
//set mongoose
//db middle ware 쿼리 없이 DB CRUD를 사용 할 수 있게 해주는 유용한 미들웨어다.
//Atlas AWS mongoDB 로 설치 해 둠.
const mongoose = require('mongoose')
const uri = 'mongodb+srv://sunday001001:alice!0503@cluster0.oyo9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' //계정 정보는 추후 암호화 저장 필요.
mongoose.connect(
    uri, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false } //없어도 되지만 AWS 이용시 오류가 발생하면 입력해 줘야 함.
)
  .catch(err => {
      console.log(err)
      process.exit(1)
  })
  .then(() => console.log('MongoDB Conneted...'))


//set route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 가져와서 DB에 저장.
  const user = new User(req.body)
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
