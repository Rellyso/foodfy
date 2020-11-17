const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const user = req.user
        return res.render('admin/profile/index', { user })
    },

    async create(req, res) {
        return res.render('admin/users/create')
    },

    async post(req, res) {
        const userId = await User.create(req.body)

        if (!userId) return res.render('/admin/users/create', {
            user: req.body,
            error: 'Erro'
        })

        return res.redirect('/admin/users')
    },

    edit(req, res) {

        return res.render(`admin/users/edit`, { user: req.user })
    },

    async put(req, res) {
        const { user } = req
        const { name, email, password } = req.body

        await User.update(user.id, {
            name,
            email,
            password
        })

        // return res.redirect('/admin/users')
        return res.render(`admin/users/edit`, {
            user: req.body,
            success: 'Usuário atualizado com sucesso'
        })
    },

    async list(req, res) {
        const users = await User.listAll()
        return res.render('admin/users/list', { users })
    }

}