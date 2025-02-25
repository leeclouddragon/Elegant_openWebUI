const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { setupProxyMiddleware } = require('./src/setupProxy');
require('dotenv').config();

const app = express();
app.use(cors());

// 使用统一的代理配置
setupProxyMiddleware(app);

// 检测环境变量，如果未设置则默认为开发环境
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(`Running in ${isDevelopment ? 'development' : 'production'} mode`);

// 根据环境提供静态文件
if (isDevelopment) {
    // 在开发环境中，React 应用由 react-scripts 提供服务
    console.log('Serving files from public directory');
    app.use('/public', express.static(path.join(__dirname, 'public')));
    
    // 添加路由处理
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
} else {
    // 生产环境下，提供构建后的静态文件
    console.log('Serving files from build directory');
    app.use(express.static(path.join(__dirname, 'build')));
    
    // 所有请求都返回 index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

// 启动服务器，尝试不同的端口
const startServer = (initialPort) => {
    let port = initialPort;
    const maxPortAttempts = 10; // 最多尝试10个端口
    
    const attemptListen = (attemptPort, attempts) => {
        const server = app.listen(attemptPort, () => {
            console.log(`Server is running on port ${attemptPort}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${attemptPort} is already in use, trying ${attemptPort + 1}...`);
                if (attempts < maxPortAttempts) {
                    attemptListen(attemptPort + 1, attempts + 1);
                } else {
                    console.error(`Could not find an available port after ${maxPortAttempts} attempts.`);
                    process.exit(1);
                }
            } else {
                console.error('Server error:', err);
                process.exit(1);
            }
        });
    };
    
    attemptListen(port, 0);
};

const port = process.env.PORT || 3004;
startServer(port); 