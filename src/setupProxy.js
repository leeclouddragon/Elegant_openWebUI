const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// 代理中间件函数
const setupProxyMiddleware = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ark.cn-beijing.volces.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v3'
      },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Authorization', `Bearer ${process.env.API_KEY}`);
        console.log('Proxy request headers:', proxyReq.getHeaders());
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Proxy response status:', proxyRes.statusCode);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
      }
    })
  );
};

// 同时支持命名导出和默认导出
module.exports = setupProxyMiddleware;
module.exports.setupProxyMiddleware = setupProxyMiddleware; 