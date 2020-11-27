const User = require('../models/User')

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (let key of keys) {
        if (body[key] == "" && key != "removed_files") {
            return {
                recipe: body,
                error: "Por favor preencha todos os campos."
            }
        }
    }

}

async function index(req, res, next) {
    const {userId:id} = req.session

    const user = await User.findOne({ where: { id } })
    
    req.user = user
    console.log(user)

    next()
}


async function post(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) return res.render('admin/recipes/create', fillAllFields)

    if (req.files.length == 0) {
        return res.render('admin/recipes/create', {
            recipe: req.body,
            error: "Envie pelo menos uma imagem."
        })
    }
}

module.exports = {
    post,
    index,
}