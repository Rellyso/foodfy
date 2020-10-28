const express = require('express')
const routes = express.Router()

const MainController = require('../app/controllers/MainController')

const admin = require('./admin')
const session = require('./session')

routes.get('/', MainController.index)

routes.use(session)
routes.use('/admin', admin)

routes.get('/home', MainController.index)
routes.get('/about', MainController.about)
routes.get('/recipes', MainController.recipes)
routes.get('/recipes/:id', MainController.recipe)
routes.get('/search', MainController.search)
routes.get('/chefs', MainController.chefs)


// Alias
routes.get('/accounts', (req, res) => {
    return res.redirect('/users/login')
})


module.exports = routes