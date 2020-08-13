const fs = require('fs')
const data = require('../../data.json')

exports.index = (req, res) => {
    const recipes = [
        ...data.recipes
    ]

    for (let i = 0; i < recipes.length; i++) {
        recipes[i] = {
            ...recipes[i],
            id: i + 1
        }
    }

    return res.render('admin/recipes/index', { recipes })
}

exports.create = (req, res) => {
    return res.render('admin/recipes/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)


    // for (let key of keys) {
    //     if (req.body[key] == "") return res.send('Please fill in all fields.')
    // }

    let { image, title, author, ingredients, preparation, information } = req.body

    data.recipes.push({
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    })
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error.')
    })

    return res.redirect('/admin/recipes')
}

exports.show = (req, res) => {
    let { id } = req.params

    const recipe = {
        id,
        ...data.recipes[id - 1]
    }

    return res.render('admin/recipes/show', { recipe })
}

exports.edit = (req, res) => {
    let { id } = req.params
    const recipe = {
        id,
        ...data.recipes[id - 1]
    }
    res.render('admin/recipes/edit', { recipe })
}

exports.put = (req, res) => {
    const { id, title, image, author, ingredients, preparation, information } = req.body
    let index = id - 1

    let newIngredients = []
    let newPreparation = []

    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] != "" || ingredients[i] != 0) {
            newIngredients.push(ingredients[i])
        }
    }

    for (let i = 0; i < preparation.length; i++) {
        if (preparation[i] != "" || preparation[i] != 0) {
            newPreparation.push(preparation[i])
        }
    }
    
    let recipeUpdated = {
        ...data.recipes[index],
        title,
        image,
        author,
        ingredients: newIngredients,
        preparation: newPreparation,
        information
    }

    data.recipes[index] = recipeUpdated

    fs.writeFile('data.json', JSON.stringify(data, null, 4), err => {
        if (err) return res.send('Write file error!')
    })

    res.redirect(`/admin/recipes/${id}`)
}

exports.delete = (req, res) => {
    let { id } = req.body

    let filteredRecipes = []
    for (let i = 0; i < data.recipes.length; i++) {
        if (id != (i + 1)) {
            filteredRecipes.push(data.recipes[i])
        }
    }

    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 4), err => {
        if (err) return res.send('Write file error!')
    })
    res.redirect('/admin/recipes')
}