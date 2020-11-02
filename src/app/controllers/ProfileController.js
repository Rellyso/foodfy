
module.exports = {
    async index(req, res) {
        return res.render('admin/profile/index')
    },

    async create(req, res) {
    
        return res.render('admin/recipes/create', { options })
    },

    async put(req, res) {
        
    },

}