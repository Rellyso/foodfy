
module.exports = {
    async index(req, res) {
        return res.render('admin/profile/index')
    },

    async create(req, res) {
    
        return res.render('admin/recipes/create', { options })
    },

    async post(req, res) {
        

    },

    async show(req, res) {
        
    },

    async edit(req, res) {
        
    },

    async put(req, res) {
        
    },

    async delete(req, res) {
       
    },
}