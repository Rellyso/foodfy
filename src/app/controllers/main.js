const data = require('../../data')

exports.index = (req, res) => {
    return res.render('main/index', {recipes: data})
}

exports.about = (req, res) => {
    return res.render('main/about')
}

exports.recipes = (req, res) => {
    return res.render('main/recipes',  {recipes: data})
}

exports.recipe =  (req, res) => {
    const recipes = data
    const recipeIndex = req.params.index

    return res.render("main/recipe", {recipe: recipes[recipeIndex]})
}