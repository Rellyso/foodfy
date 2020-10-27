const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/ProfileController')
const SessionController = require('../app/controllers/SessionController')

// rotas de sessão

// login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionController.login)
// routes.post('/logout', SessionController.logout)

// // password reset/forgot password
// routes.get('/password-reset', SessionController.resetForm)
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.post('/password-reset', SessionController.reset)
// routes.post('/forgot-password', SessionController.forgot)


// // rotas de usuário logado
// routes.get('/admin/profile', ProfileController.index)
// routes.put('/admin/profile', ProfileController.put)


// // Rotas de gerenciamento dos administradores
// routes.get('/admin/users', ProfileController.list)
// routes.post('/admin/users', ProfileController.post)
// routes.put('/admin/users', ProfileController.put)
// routes.delete('/admin/users', ProfileController.delete)


module.exports = routes