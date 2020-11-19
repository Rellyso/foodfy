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
        const { id } = req.body

        await User.update(user.id, {
            id,
            ...req.body
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
    },

    async delete(req, res) {
        // const { id } = req.body

        // await User.delete(id)

        const users = await User.listAll()

        return res.render('admin/users/list', {
            users,
            success: 'Deletado'
        })
    }

}