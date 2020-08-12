const express = require('express')
const main = require('./app/controllers/main')
const admin = require('./app/controllers/admin')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('/home')
})

routes.get('/home', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.recipe)

routes.get('/admin/recipes', admin.index)
routes.get('/admin/recipes/create', admin.create)
routes.get('/admin/recipes/:id', admin.show)
routes.get('/admin/recipes/:id/edit', admin.edit)

routes.post('/admin/recipes', admin.post)
routes.put('/admin/recipes', admin.put)
routes.delete('/admin/recipes', admin.delete)


module.exports = routes