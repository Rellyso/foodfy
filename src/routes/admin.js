const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const chefs = require('./chefs')

const RecipesController = require('../app/controllers/RecipesController')


routes.use('/chefs', chefs)

routes.get('/recipes', RecipesController.index)
routes.get('/recipes/create', RecipesController.create)
routes.get('/recipes/:id', RecipesController.show)
routes.get('/recipes/:id/edit', RecipesController.edit)

routes.post('/recipes', multer.array("images", 5), RecipesController.post)
routes.put('/recipes', multer.array("images", 5), RecipesController.put)
routes.delete('/recipes', RecipesController.delete)


module.exports = routes