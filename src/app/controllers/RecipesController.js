const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
    async index(req, res) {
        const { is_admin: isAdmin, id } = req.user

        let recipes

        if (isAdmin == true) {
            recipes = await Recipe.selectAllWithChefNamesAndFiles()
        } else {
            recipes = await Recipe.selectByUserIdWhitChefNamesAndFiles(id)
        }

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

        return res.render('admin/recipes/index', { recipes: filteredRecipes })

    },

    async create(req, res) {
        let options = await Recipe.selectChefOptions()

        return res.render('admin/recipes/create', { options })
    },

    async post(req, res) {
        const { ingredients, preparation } = req.body

        const newIngredients = [],
            newPreparation = []

        ingredients.map(ingredient => {
            if (ingredient != "" || ingredient != 0)
                newIngredients.push(ingredient)
        })

        preparation.map(prep => {
            if (prep != "" || prep != 0)
                newPreparation.push(prep)
        })

        const data = {
            chef_id: req.body.chef_id,
            title: req.body.title,
            information: req.body.information,
            user_id: req.body.user_id,
            ingredients: newIngredients,
            preparation: newPreparation,
        }
        console.log(data)

        try {
            const recipeId = await Recipe.create(data)
            console.log(recipeId)

            const filesPromise = req.files.map(file => File.createRecipeFile({ ...file, recipe_id: recipeId }))
            await Promise.all(filesPromise)

            return res.redirect(`/admin/recipes/${recipeId}`)
        } catch (err) {
            console.error(err)

            return res.render('admin/recipes/create', {
                recipe: req.body,
                options: await Recipe.selectChefOptions(),
                error: "It wasn't possible create a new recipe"
            })
        }

    },

    async show(req, res) {
        const { id } = req.params
        try {
            let recipe = await Recipe.find(id)

            files = await File.getFilesByRecipeId(id)

            files.map(file => {
                file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            })

            return res.render(`admin/recipes/show`, { recipe, files })
        } catch (err) {
            res.send(err)
        }
    },

    async edit(req, res) {
        const { id } = req.params

        let recipe = await Recipe.find(id)

        let options = await Recipe.selectChefOptions()

        let files = await File.getFilesByRecipeId(id)

        files.map(file => {
            file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        })

        res.render('admin/recipes/edit', { recipe, options, files })
    },

    async put(req, res) {
        // teste de campos preenchidos
        try {
            const keys = Object.keys(req.body)
            for (let key of keys) {
                if (req.body[key] == "" && key != "removed_files") {
                    return res.send('Please fill in all the fields.')
                }
            }

            const { ingredients, preparation } = req.body
            let newIngredients = [],
                newPreparation = []

            ingredients.map(ingredient => {
                if (ingredient != "" || ingredient != 0)
                    newIngredients.push(ingredient)
            })

            preparation.map(prep => {
                if (prep != "" || prep != 0)
                    newPreparation.push(prep)
            })

            const data = {
                ...req.body,
                id: parseInt(req.body.id, 10),
                chef_id: parseInt(req.body.chef_id, 10),
                ingredients: newIngredients,
                preparation: newPreparation,
            }

            if (req.files.length != 0) {
                const newFilesPromise = req.files.map(file => File.createRecipeFile({ ...file, recipe_id: req.body.id }))

                await Promise.all(newFilesPromise)
            }

            if (req.body.removed_files) {
                // 1, 2, 3,
                const removedFiles = req.body.removed_files.split(',') // [1, 2, 3, ""]
                const lastIndex = removedFiles.length - 1 // [1, 2, 3, -> ""]
                removedFiles.splice(lastIndex, 1) // [1, 2, 3]

                const removedFilesPromise = removedFiles.map(id => File.deleteFileFromRecipe(id))

                await Promise.all(removedFilesPromise)
            }

            let results = await Recipe.update(data)
            const recipeId = results.rows[0].id


            return res.redirect(`/admin/recipes/${recipeId}`)
        } catch (err) {
            res.send(`It wasn't possible updating recipe because: Has an ${err}`)
        }
    },

    async delete(req, res) {
        const { id } = req.body

        await File.deleteFilesFromRecipe(parseInt(id))
        await Recipe.delete(parseInt(id))

        return res.redirect('/admin/recipes')
    },
}