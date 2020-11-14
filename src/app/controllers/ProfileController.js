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
        return res.redirect('/admin/users')
    },

    async put(req, res) {
        
    },

    async list(req, res) {
        const users = await User.listAll()
        return res.render('admin/users/list', { users })
    }

}