const express = require('express')
const routes = express.Router()

const ProfileController = require('../../app/controllers/ProfileController')
const UserValidator = require('../../app/validators/user')

// rotas de sessão

// // rotas de usuário logado
routes.get('/profile', UserValidator.show, ProfileController.index)
routes.put('/profile', UserValidator.update, ProfileController.put)


// // Rotas para gerenciamento dos administradores
routes.get('/users', ProfileController.list)
routes.get('/users/create', ProfileController.create)

routes.post('/users/create', UserValidator.post, ProfileController.post)
// routes.put('/users', ProfileController.put)
// routes.delete('/users', ProfileController.delete)


module.exports = routes