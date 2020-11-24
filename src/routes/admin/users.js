const express = require('express')
const routes = express.Router()
const { isAdmin, onlyAdmins, onlyUsers } = require('../../app/middlewares/session')

const ProfileController = require('../../app/controllers/ProfileController')
const UserController = require('../../app/controllers/UserController')
const UserValidator = require('../../app/validators/user')
const ProfileValidator = require('../../app/validators/profile')

// rotas de sessão

// // rotas de usuário logado
routes.get('/profile', onlyUsers, ProfileValidator.show, ProfileController.index)
routes.put('/profile', onlyUsers, ProfileValidator.update, ProfileController.put)


// // Rotas para gerenciamento dos administradores
routes.get('/users', isAdmin, onlyAdmins, UserController.list)
routes.get('/users/create', isAdmin, onlyAdmins, UserController.create)
routes.get('/users/edit/:id', isAdmin, onlyAdmins, UserValidator.edit, UserController.edit)

routes.post('/users/create', UserValidator.post, UserController.post)
routes.put('/users', UserValidator.update, UserController.put)
routes.delete('/users', UserController.delete)


module.exports = routes