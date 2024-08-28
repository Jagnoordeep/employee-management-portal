const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://hub.dummyapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api from the beginning of the path
      },
    })
  );
};
