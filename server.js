const express = require('express')
const nunjuck = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()


nunjuck.configure("views", {
    express: server,
    noCache: true,
    autoescape: false
})

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method'))

server.use(routes)

server.set("view engine", "njk")

server.listen(5000, function () {
    console.log('server is running')
})