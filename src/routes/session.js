const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/ProfileController')
const SessionController = require('../app/controllers/SessionController')
const SessionValidator = require('../app/validators/session')
// rotas de sessão

// login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// // password reset/forgot password
// routes.get('/password-reset', SessionController.resetForm)
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.post('/password-reset', SessionController.reset)
// routes.post('/forgot-password', SessionController.forgot)


module.exports = routes