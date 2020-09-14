const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
    index(req, res) {
        Recipe.selectAllWithChefNames((recipes) => {
            return res.render('admin/recipes/index', { recipes })
        })
    },
    
    create(req, res) {
        Recipe.selectChefOptions((options) => {
            return res.render('admin/recipes/create', { options })
        })
    },
    
    async post(req, res) {
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
            ingredients: newIngredients,
            preparation: newPreparation
        }

        if (req.files == 0) {
            res.send('Please sen at least an image.')
        }
        try {
            let results = await Recipe.create(data)
            const recipeId = results.rows[0].id

            const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeId}))
            await Promise.all(filesPromise)
            
            
            return res.redirect(`/admin/recipes/${recipeId}`)
        } catch (err) {
            res.send(`It wasn't possible create a new recipe, has an error at ${err}`)
        }

    },
    
    show(req, res) {
        const { id } = req.params
    
        Recipe.find(id, (recipe) => {
            return res.render('admin/recipes/show', { recipe })
        })
    },
    
    edit(req, res) {
        const { id } = req.params
    
        Recipe.find(id, (recipe) => {
            Recipe.selectChefOptions((options) => {
                res.render('admin/recipes/edit', { recipe, options })
            })
        })
    },

    put(req, res) {
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
    },
    
    delete(req, res) {
        const { id } = req.body
    
        Recipe.delete(id, () => {
            res.redirect('/admin/recipes')
        })
    },
}