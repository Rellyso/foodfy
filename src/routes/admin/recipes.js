const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const { onlyUsers, onlyAdmins, isOwner } = require('../../app/middlewares/session')

const RecipesController = require('../../app/controllers/RecipesController')
const RecipesValidator = require('../../app/validators/recipes')


// ROTAS DAS RECEITAS
routes.get('/', onlyUsers, RecipesValidator.index, RecipesController.index)
routes.get('/create', onlyUsers, RecipesController.create)
routes.get('/:id', onlyUsers, isOwner, RecipesController.show)
routes.get('/:id/edit', isOwner, onlyAdmins, RecipesController.edit)

routes.post('/', multer.array("images", 5), RecipesValidator.post, RecipesController.post)
routes.put('/', multer.array("images", 5), RecipesController.put)
routes.delete('/', RecipesController.delete)


module.exports = routes