const express = require('express')
const nunjuck = require('nunjucks')
const routes = require('./routes')
const server = express()


nunjuck.configure("views", {
    express: server,
    noCache: true,
    autoescape: false
})

server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

server.listen(5000, function () {
    console.log('server is running')
})