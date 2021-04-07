const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const uri = 'mongodb+srv://sunday001001:alice!0503@cluster0.oyo9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(
    uri, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
)
  .catch(err => {
      console.log(err)
      process.exit(1)
  })
  .then(() => console.log('MongoDB Conneted...'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
