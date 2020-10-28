const express = require('express')
const routes = express.Router()

const chefs = require('./admin/chefs')
const recipes = require('./admin/recipes')
const users = require('./admin/users')


// ROTAS DE CHEFS
routes.use('/chefs', chefs)

// ROTAS DE RECEITAS
routes.use('/recipes', recipes)

// ROTAS DO USUÁRIO
routes.use(users)

module.exports = routes