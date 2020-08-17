const Recipe = require("../models/Recipe")

exports.index = (req, res) => {
    Recipe.all((recipes) => {
        return res.render('main/index', { recipes })
    })
}

exports.about = (req, res) => {
    return res.render('main/about')
}

exports.recipes = (req, res) => {
    Recipe.selectAllWithChefNames((recipes) => {
        return res.render('main/recipes', { recipes })
    })
}

exports.recipe = (req, res) => {
    const { id } = req.params
    
    Recipe.find(id, (recipe) => {
        console.log(recipe)
        return res.render("main/recipe", { recipe })
    })
}