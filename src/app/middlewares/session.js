function onlyUsers(req, res, next) {
    if (!req.session.userId)
        // return res.redirect('/accounts')

    next()
}

module.exports = {
    onlyUsers
}