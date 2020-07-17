const express = require('express')
const foodfy = require('./controllers/foodfy')
const recipes = require('./controllers/recipes')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('/home')
})

routes.get('/home', foodfy.index)
routes.get('/about', foodfy.about)
routes.get('/recipes', foodfy.recipes)
routes.get('/recipes/:index', foodfy.recipe)

routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
// routes.delete('/admin/recipes', recipes.delete)


module.exports = routes