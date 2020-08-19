const express = require('express')
const main = require('./app/controllers/main')
const admin = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('/home')
})

routes.get('/home', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:id', main.recipe)
routes.get('/search', main.search)
routes.get('/chefs', main.chefs)

routes.get('/admin/recipes', admin.index)
routes.get('/admin/recipes/create', admin.create)
routes.get('/admin/recipes/:id', admin.show)
routes.get('/admin/recipes/:id/edit', admin.edit)

routes.post('/admin/recipes', admin.post)
routes.put('/admin/recipes', admin.put)
routes.delete('/admin/recipes', admin.delete)

routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)


module.exports = routes