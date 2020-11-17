const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const user = req.user
        return res.render('admin/profile/index', { user })
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
        return res.render(`admin/profile/index`, {
            user: req.body,
            success: 'Usuário atualizado com sucesso'
        })
    },
}