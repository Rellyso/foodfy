const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const { onlyUsers, onlyAdmins } = require('../../app/middlewares/session')

const RecipesController = require('../../app/controllers/RecipesController')
const RecipesValidator = require('../../app/validators/recipes')


// ROTAS DAS RECEITAS
routes.get('/', onlyUsers, RecipesController.index)
routes.get('/create', onlyAdmins, RecipesController.create)
routes.get('/:id', onlyUsers, RecipesController.show)
routes.get('/:id/edit', onlyAdmins, RecipesController.edit)

routes.post('/', multer.array("images", 5), RecipesValidator.post, RecipesController.post)
routes.put('/', multer.array("images", 5), RecipesController.put)
routes.delete('/', RecipesController.delete)


module.exports = routes