const User = require('../models/User')
const Recipe = require('../models/Recipe')

async function isAdmin(req, res, next) {
    try {
        const { userId: id } = req.session

        
        const user = await User.findOne({ where: { id } })
        
        if (!user) {
            req.session.isAdmin = false
        }
        
        req.session.isAdmin = user.is_admin


        next()
    } catch (err) {
        return res.render('session/login', {
            error: 'Você precisa se conectar para acessar.'
        })
    }
}

function onlyUsers(req, res, next) {
    if (!req.session.userId)
        return res.redirect('/accounts')

    next()
}

async function onlyAdmins(req, res, next) {
    try {
        const { userId: id } = req.session

        const user = await User.findOne({ where: { id } })

        // redirecionar usuário para outra rota se não for administrador ou proprietário da receita
        if (!user.is_admin && !req.session.isOwner) {
            return res.redirect('/admin/profile')

        }

        req.session.isAdmin = user.is_admin

        next()
    } catch (err) {
        console.error(err)
        return res.render('session/login', {
            error: 'Você precisa se conectar para acessar.'
        })
    }
}

async function isOwner(req, res, next) {
    const 
        { id:recipeId } = req.params,
        { userId, isAdmin } = req.session

    try {
        
        const recipe = await Recipe.find(recipeId)
        
        if (userId != recipe.user_id && !isAdmin) return res.redirect('/admin/recipes')

        req.session.isOwner = true
        
        next()
    } catch (err) {
        console.error(err)
        return res.render('session/login', {
            error: 'Você precisa se conectar para acessar.'
        })
    }
}


module.exports = {
    onlyUsers,
    onlyAdmins,
    isOwner,
    isAdmin,
}