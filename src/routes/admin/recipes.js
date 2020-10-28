const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const { onlyUsers } = require('../../app/middlewares/session')

const RecipesController = require('../../app/controllers/RecipesController')


// ROTAS DAS RECEITAS
routes.get('/', onlyUsers, RecipesController.index)
routes.get('/create', onlyUsers, RecipesController.create)
routes.get('/:id', onlyUsers, RecipesController.show)
routes.get('/:id/edit', onlyUsers, RecipesController.edit)

routes.post('/', multer.array("images", 5), RecipesController.post)
routes.put('/', multer.array("images", 5), RecipesController.put)
routes.delete('/', RecipesController.delete)


module.exports = routes