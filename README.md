<img src="http://cdn.mydaily.co.kr/FILES/202104/202104141904539188_1.jpg" width="450px" height="300px" title="유강남 홈런" alt="LG Twins 유강남"></img><br/>

# About
- node.js 공부 겸 여러 용도로 사용할 뼈대 프로젝트

# History
- 2021-04-14 뼈대 완성

# Developing
- jsonwebtoken 사용법
```javascript
//https://www.npmjs.com/package/jsonwebtoken
userSchema.methods.generateToken = function(cb) {
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}
```

gitignore 는 Toptal 사이트에서 만들었다.   
Link: [Toptal](https://www.toptal.com/developers/gitignore, "Toptal link")
