const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ikmbackend-production.up.railway.app',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );
};