const express = require('express')
const nunjuck = require('nunjucks')

const server = express()

nunjuck.configure({
    express: server,
    noCache: true,
    autoescape: false
})

server.set("view engine", "html")

server.use(express.static('public'))

server.get('/', (req, res) => {
    return res.render('index')
})

server.listen(5000, function () {
    console.log('server is running')
})