//실행 환경에 맞춰 컨피그 취득하게 설계
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}