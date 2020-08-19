const Recipe = require('../models/Recipe')

exports.index = (req, res) => {
    Recipe.selectAllWithChefNames((recipes) => {
        return res.render('admin/recipes/index', { recipes })
    })
}

exports.create = (req, res) => {
    Recipe.selectChefOptions((options) => {
        return res.render('admin/recipes/create', { options })
    })
}

exports.post = (req, res) => {
    const { ingredients, preparation } = req.body

    let newIngredients = [],
        newPreparation = []

    for (let ingredient of ingredients) {
        if (ingredient != "") {
            newIngredients.push(ingredient)
        }
    }

    for (let prep of preparation) {
        if (prep != "") {
            newPreparation.push(prep)
        }
    }

    const data = {
        ...req.body,
        ingredients: newIngredients,
        preparation: newPreparation
    }

    Recipe.create(data, (recipe) => {
        return res.redirect(`/admin/recipes/${recipe.id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    Recipe.find(id, (recipe) => {
        return res.render('admin/recipes/show', { recipe })
    })
}

exports.edit = (req, res) => {
    const { id } = req.params

    Recipe.find(id, (recipe) => {
        Recipe.selectChefOptions((options) => {
            res.render('admin/recipes/edit', { recipe, options })
        })
    })
}

exports.put = (req, res) => {
    const { ingredients, preparation } = req.body
    let newIngredients = [],
        newPreparation = []

    for (let ingredient of ingredients) {
        if (ingredient === "") {

        } else {
            newIngredients.push(ingredient)
        }
    }

    for (let prep of preparation) {
        if (prep == "") {

        } else {
            newPreparation.push(prep)
        }
    }

    const paramsBody = {
        ...req.body,
        id: parseInt(req.body.id, 10),
        chef_id: parseInt(req.body.chef_id, 10),
        ingredients: newIngredients,
        preparation: newPreparation,
    }

    Recipe.update(paramsBody, (recipe) => {
        return res.redirect(`/admin/recipes/${recipe.id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    Recipe.delete(id, () => {
        res.redirect('/admin/recipes')
    })
}