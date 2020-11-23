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

async function reset(req, res, next) {
    const { email, password, passwordRepeat, token } = req.body

    const user = await User.findOne({ where: { email } })

    // verifica se usuário existe
    if (!user) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Usuário inexistente! <br> Verifique se seu email está correto.'
    })

    
    // verifica se senhas batem
    if (password != passwordRepeat) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Senhas estão diferentes. Tente novamente.'
    })

    
    //verifica se o token é válido
    let now = new Date()
    now = now.setHours(now.getHours())

    if (now > user.reset_token_expires) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token expirado.'
    })


    req.user = user

    next()
}

module.exports = {
    login,
    forgot,
    reset,
}