const Recipe = require('../models/Recipe')

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

    for (let key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
            return res.render('admin/recipes/create', {
                recipe: req.body,
                error: "Por favor preencha todos os campos."
            })
        }
    }

    
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
}