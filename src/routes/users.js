const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/ProfileController')

// // rotas de usuário logado
// routes.get('/admin/profile', ProfileController.index)
// routes.put('/admin/profile', ProfileController.put)


// // Rotas de gerenciamento dos administradores
// routes.get('/admin/users', ProfileController.list)
// routes.post('/admin/users', ProfileController.post)
// routes.put('/admin/users', ProfileController.put)
// routes.delete('/admin/users', ProfileController.delete)


module.exports = routes