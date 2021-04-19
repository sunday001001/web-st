//port가 다르면 CORS 정책에 의해 차단 된다.
//client에는 http-proxy-middleware 모듈 사용해 해결 가능하고 server에서는 cors 모듈로 해결이 가능 하다.

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};