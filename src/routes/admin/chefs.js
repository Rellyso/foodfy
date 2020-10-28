const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const { onlyUsers } = require('../../app/middlewares/session')

const ChefController = require('../../app/controllers/ChefController')

// ROTAS DE CHEFS
routes.get('/', onlyUsers, ChefController.index)
routes.get('/create', onlyUsers,  ChefController.create)
routes.get('/:id', onlyUsers,  ChefController.show)
routes.get('/:id/edit', onlyUsers,  ChefController.edit)

routes.post('/', multer.single("images"), ChefController.post)
routes.put('/', multer.single("images"), ChefController.put)
routes.delete('/', ChefController.delete)

module.exports = routes
