const User = require('../models/User')


function onlyUsers(req, res, next) {
    if (!req.session.userId)
        return res.redirect('/accounts')

    next()
}

async function onlyAdmins(req, res, next) {
    try {
        const { userId: id } = req.session

        const user = await User.findOne({ where: { id } })

        
        if (!user.is_admin) {
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


module.exports = {
    onlyUsers,
    onlyAdmins,
    isAdmin,
}