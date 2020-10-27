
module.exports = {
    async loginForm(req, res) {
        return res.render('session/login')
    },

    async login(req, res) {
        req.session.userId = req.users
        return res.render('session/login', {error: 'Ainda não tá pronto'})
    },
}