import axios from 'axios'

export const axiosClient = axios.create({
baseURL: 'https://restapi.socexperts.com/api/'  
//baseURL: 'https://localhost:44380/api/'
})

// const proxy = require("http-proxy-middleware")
// module.exports = function(app) {
//   app.use(
//     proxy("/Login/StudentLogin", {
//       target: "https://localhost:44380/api/"
//     })
//   )
// }
// const express = require("express")
// const cors = require('cors')
// const app = express()c
// app.use(cors())
// const { createProxyMiddleware } = require('http-proxy-middleware')
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:8080/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));
// app.listen(5000);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "X-Requested-With")
//   next()
//   })