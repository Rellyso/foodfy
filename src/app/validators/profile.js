const User = require('../models/User')

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
        error: "Usuário não encontrado."
    })

    req.user = user

    next()
}

async function update(req, res, next) {
    const { id } = req.body
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) return res.render('admin/profile/index', {
        user: req.body,
        error: "Por favor preencha todos os campos para atualizar."
    })

    const user = await User.findOne({ where: { id } })

    if (!user) return res.render('admin/profile/register', {
        error: "Usuário não encontrado."
    })

    req.user = user

    next()
}

module.exports = {
    show,
    update,
}