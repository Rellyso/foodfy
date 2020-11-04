module.exports = {
    async index(req, res) {
        const user = req.user
        return res.render('admin/profile/index', { user })
    },

    async create(req, res) {
        return res.render('admin/users/create')
    },

    async put(req, res) {
        
    },

}