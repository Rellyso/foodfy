const User = require('../models/User')

function checkAllFields(body) {
    const keys = Object.keys(body)

    keys.map(key => {
        if (body[key] == "") {
            return {
                user: body,
                error: "Por favor preencha todos os campos."
            }
        }
    })
}

async function show(req, res, next) {
    const { userId: id } = req.session

    const user = await User.findOne({ where: { id } })

    if (!user) return res.render('users/register', {
        error: "Usuário não encontrado."
    })

    req.user = user

    next()
}

module.exports = {
    show,
}