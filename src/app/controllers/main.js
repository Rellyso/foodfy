const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
    async index(req, res) {
        let results = await Recipe.selectAllWithChefNamesAndFiles()
        const recipes = results.rows

        let lastId = 0
        let filteredRecipes = []
        recipes.forEach(recipe => {

            if (recipe.id !== lastId)
                filteredRecipes.push(recipe)
            
            if (recipe.path != null)
                recipe.src = `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`

            lastId = recipe.id
        })

        return res.render('main/index', { recipes })
    },

    about(req, res) {
        return res.render('main/about')
    },

    async recipes(req, res) {
        let results = await Recipe.selectAllWithChefNamesAndFiles()
        const recipes = results.rows

        return res.render('main/recipes', { recipes })
    },

    recipe(req, res) {
        const { id } = req.params

        Recipe.find(id, (recipe) => {
            return res.render("main/recipe", { recipe })
        })
    },

    search(req, res) {
        const { filter } = req.query
    
        Recipe.findBy(filter, (filteredRecipes) => {
            res.render('main/search', { recipes: filteredRecipes, filter })
        })
    },

    chefs(req, res) {
        Chef.selectChefsWithTotalRecipes((chefs) => {
            res.render('main/chefs', { chefs })
        })
    }
}
