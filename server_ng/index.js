const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = 9527
// 食药院药品服务
app.use('/prod-api/medicinal', createProxyMiddleware({
  target: 'http://192.168.36.221:9095',
  changeOrigin: true,
  pathRewrite: {
    '^/prod-api/medicinal': '',
  },
}));

// 食药院食品服务
app.use('/prod-api/food', createProxyMiddleware({
  target: 'http://192.168.36.58:9090',
  changeOrigin: true,
  pathRewrite: {
    '^/prod-api/food': '',
  },
}));

// 食药院公共服务
app.use('/prod-api', createProxyMiddleware({
  target: 'http://192.168.36.221:9095',
  changeOrigin: true,
}));

// 错误页面处理
app.use((err, req, res, next) => {
  res.status(500).send('服务器内部错误');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`本地代理服务已启动 端口 ${port}`);
});