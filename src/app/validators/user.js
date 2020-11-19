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

async function post(req, res, next) {
    try {
        const fillAllFields = checkAllFields(req.body)

        if (fillAllFields) {
            return res.render('admin/users/create', fillAllFields)
        }

        let { email, name, isAdmin } = req.body

        const user = await User.findOne({
            where: { email },
        })

        if (user) return res.render('admin/users/create', {
            user: req.body,
            error: 'Email já cadastrado.'
        })

        next()

    } catch (err) {
        return res.render('admin/users/create', {
            error: err,
        })
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

async function edit(req, res, next) {
    const { id } = req.params

    if (id == req.session.userId) return res.redirect('/admin/profile')

    const user = await User.findOne({
        where: { id }
    })

    if (!user) return res.render('admin/users', {
        error: 'Usuário não encontrado.'
    })

    req.user = user

    next()
}

async function update(req, res, next) {
    const { id } = req.body

    try {
        const fillAllFields = checkAllFields(req.body)

        if (fillAllFields) return res.render('admin/users/edit', fillAllFields)

        const user = await User.findOne({ where: { id } })

        if (!user) return res.render('admin/profile/index', {
            user: req.body,
            error: "Usuário não foi encontrado."
        })

        req.user = user

        next()
    } catch (err) {
        console.error(err)

        return res.render('admin/users', {
            user: req.body,
            error: "Ocorreu um erro."
        })
    }

}

module.exports = {
    post,
    show,
    edit,
    update,
}