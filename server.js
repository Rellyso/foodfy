const express = require('express')
const nunjuck = require('nunjucks')

const data = require('./data')

const server = express()

nunjuck.configure("views", {
    express: server,
    noCache: true,
    autoescape: false
})

server.set("view engine", "njk")

server.use(express.static('public'))

server.get('/', (req, res) => {
    return res.render('home', {recipes: data})
})

server.get('/about', (req, res) => {
    return res.render('about')
})

server.get('/recipes', (req, res) => {
    return res.render('recipes',  {recipes: data})
})

server.get('/recipes/:index', (req, res) => {
    const recipes = data
    const recipeIndex = req.params.index

    return res.render("recipe", {recipe: recipes[recipeIndex]})
})

server.listen(5000, function () {
    console.log('server is running')
})