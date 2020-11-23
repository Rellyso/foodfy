const User = require('../models/User')

function onlyUsers(req, res, next) {
    if (!req.session.userId)
        return res.redirect('/accounts')

    next()
}

async function onlyAdmins(req, res, next) {
    try {
        const { userId } = req.session

        const user = await User.findOne(userId)

        if (!user.is_admin) {
            return res.render('admin/profile/index', {
                user: user,
                error: 'Somente admins podem acessar.'
        })
        }

        next()
    } catch (err) {
        return res.render('session/login', {
            error: 'Você precisa se conectar para acessar.'
        })
    }
}


module.exports = {
    onlyUsers,
    onlyAdmins,
}