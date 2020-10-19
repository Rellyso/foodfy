const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")
const File = require("../models/File")

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

        return res.render('main/index', { recipes: filteredRecipes })
    },

    about(req, res) {
        return res.render('main/about')
    },

    async recipes(req, res) {
        let results = await Recipe.selectAllWithChefNamesAndFiles()
        const recipes = results.rows

        let lastId = 0
        let filteredRecipes = []
        recipes.forEach(recipe => {


            if (recipe.id !== lastId) {
                filteredRecipes.push(recipe)
            }
            if (recipe.path != null) {
                recipe.src = `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`
            }

            lastId = recipe.id
        })

        return res.render('main/recipes', { recipes: filteredRecipes })
    },

    async recipe(req, res) {
        const { id } = req.params

        let results = await Recipe.find(id)
        const recipe = results.rows[0]

        results = await File.getFilesByRecipeId(id)
        let files = results.rows

        files.map(file => {
            file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        })

        return res.render("main/recipe", { recipe, files })
    },

    async search(req, res) {
        const { filter } = req.query

        let results = await Recipe.findBy(filter)

        let lastId = 0
        let filteredRecipes = []
        results.rows.forEach(recipe => {


            if (recipe.id !== lastId) {
                filteredRecipes.push(recipe)
            }
            if (recipe.path != null) {
                recipe.src = `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`
            }

            lastId = recipe.id
        })

        res.render('main/search', { recipes: filteredRecipes, filter })
    },

    async chefs(req, res) {
        let results = await Chef.selectChefsWithTotalRecipes()
        const chefsQuery = results.rows,
            chefs = []

        chefsQuery.forEach(chef => {
            chef.avatar_url = `${req.protocol}://${req.headers.host}${chef.path.replace('public', '')}`

            chefs.push(chef)
        })

        res.render('main/chefs', { chefs })
    }
}
