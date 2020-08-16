const fs = require('fs')
const data = require('../../data.json')
const Recipe = require('../models/Recipe')

exports.index = (req, res) => {

//     const recipes = [
//         ...data.recipes
//     ]

//     for (let i = 0; i < recipes.length; i++) {
//         recipes[i] = {
//             ...recipes[i],
//             id: i + 1
//         }
//     }
    Recipe.all((recipes) => {


        return res.render('admin/recipes/index', { recipes })
    })
}

exports.create = (req, res) => {

    Recipe.selectChefOptions( (options) => {

        return res.render('admin/recipes/create', { options })
    })
    
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)


    for (let key of keys) {
        if (req.body[key] == "") return res.send('Please fill in all fields.')
    }

    Recipe.create(req.body, (recipe) => {
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
    // return res.send(paramsBody)

    Recipe.update(paramsBody, (recipe) => {
        return res.redirect(`/admin/recipes/${recipe.id}`)
    })
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