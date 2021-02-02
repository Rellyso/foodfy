const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const SessionValidator = require('../app/validators/session')
// rotas de sessão

// login/logout/register
routes.get('/login', SessionController.loginForm)
    .get('/register', SessionController.register)
    .post('/login', SessionValidator.login, SessionController.login)
    .post('/logout', SessionController.logout)

// // password reset/forgot password
routes.get('/password-reset', SessionController.resetForm)
    .get('/forgot-password', SessionController.forgotForm)
    .post('/password-reset', SessionValidator.reset, SessionController.reset)
    .post('/forgot-password', SessionValidator.forgot, SessionController.forgot)


module.exports = routes