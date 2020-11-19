const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (let key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor preencha todos os campos.'
            }
        }
    }

}

async function show(req, res, next) {
    const { userId: id } = req.session

    const user = await User.findOne({ where: { id } })

    if (!user) return res.render('profile/register', {
        user: req.body,
        error: "Usuário não encontrado."
    })

    req.user = user

    next()
}

async function update(req, res, next) {
    const { id, password } = req.body

    try {
        const fillAllFields = checkAllFields(req.body)
        if (fillAllFields) return res.render('admin/profile/index', fillAllFields)

        const user = await User.findOne({ where: { id } })

        //verify if password match
        const passed = await compare(password, user.password)

        if (!passed) return res.render('admin/profile/index', {
            user: req.body,
            error: "Senha incorreta."
        })

        req.user = user
        next()

    } catch (err) {
        console.error(err)

        return res.render('admin/profile/index', {
            user: req.body,
            error: "Ocorreu um erro."
        })
    }
}

module.exports = {
    show,
    update,
}