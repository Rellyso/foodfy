const User = require('../models/User')
const { compare } = require('bcryptjs')

async function login(req, res, next) {
    // verify if user exists
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.render('session/login', {
            user: req.body,
            error: 'Usuário não encontrado.'
        })
    }

    // verify if password match with user password
    const passed = await compare(password, user.password)
    // const passed = await compare(password, user.password)

    if (!passed) {
        return res.render('session/login', {
            user: req.user,
            error: 'Senha incorreta.'
        })
    }

    req.user = user

    next()
}

async function forgot(req, res, next) {
    // verify if user exists
    const { email } = req.body

    try {
        let user = await User.findOne({ where: { email } })

        if (!user) return res.render('session/forgot', {
            user: req.body,
            error: 'Usuário inexistente! <br> Verifique se seu email está correto.'
        })
        req.user = user
    
        next()
    } catch (err) {
        
    }
}

module.exports = {
    login,
    forgot,
}