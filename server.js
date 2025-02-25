const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

// 代理配置
app.use('/api', createProxyMiddleware({
    target: 'https://ark.cn-beijing.volces.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api/v3'
    },
    onProxyReq: (proxyReq) => {
        // 添加 Bearer 前缀
        proxyReq.setHeader('Authorization', `Bearer ${process.env.API_KEY}`);
        console.log('Proxy request headers:', proxyReq.getHeaders());  // 添加日志
    },
    onProxyRes: (proxyRes, req, res) => {  // 添加响应日志
        console.log('Proxy response status:', proxyRes.statusCode);
    },
    onError: (err, req, res) => {  // 添加错误处理
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

// 修改静态文件服务配置
app.use(express.static(__dirname));

// 添加路由处理
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'task.html'));
});

// 启动服务器
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 