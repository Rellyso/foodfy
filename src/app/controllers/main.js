const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

exports.index = (req, res) => {
    Recipe.selectAllWithChefNames((recipes) => {
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
        return res.render("main/recipe", { recipe })
    })
}

exports.search = (req, res) => {
    const { filter } = req.query

    Recipe.findBy(filter, (filteredRecipes) => {
        res.render('main/search', { recipes: filteredRecipes, filter })
    })
}

exports.chefs = (req, res) => {
    Chef.selectChefsWithTotalRecipes((chefs) => {
        res.render('main/chefs', {chefs})
    })
}