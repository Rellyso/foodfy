const User = require('../models/User')

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (let key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor preencha todos os campos.'
            }
        }
    }
}

module.exports = {
    
}