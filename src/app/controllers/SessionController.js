
module.exports = {
    async loginForm(req, res) {
        return res.render('session/login')
    },

    async login(req, res) {
        req.session.userId = req.user.id

        return res.redirect('/admin')
    },
}