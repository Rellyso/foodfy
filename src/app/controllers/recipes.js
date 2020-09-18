const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
    async index(req, res) {
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
        
        return res.render('admin/recipes/index', { recipes: filteredRecipes })

    },

    async create(req, res) {
        let results = await Recipe.selectChefOptions()
        const options = results.rows

        return res.render('admin/recipes/create', { options })
    },

    async post(req, res) {
        const { ingredients, preparation } = req.body

        const keys = new Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please fill in all the fields.')
            }
        }

        if (req.files.length == 0) {
            return res.send("Please send at least one image.")
        }

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
            ingredients: newIngredients,
            preparation: newPreparation
        }

        try {
            let results = await Recipe.create(data)
            const recipeId = results.rows[0].id

            const filesPromise = req.files.map(file => File.create({ ...file, recipe_id: recipeId }))
            await Promise.all(filesPromise)


            return res.redirect(`/admin/recipes/${recipeId}`)
        } catch (err) {
            res.send(`It wasn't possible create a new recipe, has an error at ${err}`)
        }

    },

    async show(req, res) {
        const { id } = req.params
        try {
            let results = await Recipe.find(id)
            const recipe = results.rows[0]

            results = await File.getFilesByRecipeId(id)
            let files = results.rows

            files.map(file => {
                file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            })

            return res.render(`admin/recipes/show`, {recipe, files})
        } catch (err) {
            res.send(err)
        }
    },

    async edit(req, res) {
        const { id } = req.params

        let results = await Recipe.find(id)
        const recipe = results.rows[0]

        results = await Recipe.selectChefOptions()
        const options = results.rows

        results = await File.getFilesByRecipeId(id)
        let files = results.rows

        files.map(file => {
            file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        })
        
        res.render('admin/recipes/edit', { recipe, options, files })
    },

    async put(req, res) {
        // teste de campos preenchidos
        const keys = new Object.keys(req.body)
        for (let key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please fill in all the fields.')
            }
        }
        
        // teste de envio de pelo menos uma imagem
        if (req.files.length == 0) {
            return res.send("Please send at least one image.")
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

        if (req.files == 0) {
            res.send('Please send at least an image.')
        }

        // criar lógica de removed_files para excluir arquivos de imagem do files

        try {
            let results = await Recipe.update(data)
            const recipeId = results.rows[0].id


            return res.redirect(`/admin/recipes/${recipeId}`)
        } catch (err) {
            res.send(`It wasn't possible updating recipe because: Has an ${err}`)
        }
    },

    delete(req, res) {
        const { id } = req.body

        Recipe.delete(id, () => {
            res.redirect('/admin/recipes')
        })
    },
}