const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRouds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: 1
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    token: {
        type: String
    },
    tokenexp: {
        type: Number
    }
})

//save 호출시 선행 작업이므로 반드시 next 함수를 사용해서 다음 단계로 넘어 가야 함.
userSchema.pre('save', function (next) {
    var user = this //userSchema

    //password 일 경우만 값을 암호화 함.
    if (user.isModified('password')) {
        //비밀번호 암호화
        bcrypt.genSalt(saltRouds, function (err, salt) {
            if (err) return next(err)
            //입력 받은 user.password를 암호화 해서 hash에 저장한뒤 user.password에 저장
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 암호화된 비밀번호
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err), 
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    //jsonwebtoken을 이용
    ////https://www.npmjs.com/package/jsonwebtoken
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)

    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }