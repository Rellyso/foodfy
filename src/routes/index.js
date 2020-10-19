const express = require('express')
const routes = express.Router()
const MainController = require('../app/controllers/MainController')
const admin = require('../app/controllers/RecipesController')
const chefs = require('./chefs')
const admin = require('./admin')
const multer = require('../app/middlewares/multer')

routes.get('/', (req, res) => {
    return res.redirect('/home')
})

routes.use('/chefs', chefs)
routes.use('/admin', admin)

routes.get('/home', MainController.index)
routes.get('/about', MainController.about)
routes.get('/recipes', MainController.recipes)
routes.get('/recipes/:id', MainController.recipe)
routes.get('/search', MainController.search)
routes.get('/chefs', MainController.chefs)


module.exports = routes