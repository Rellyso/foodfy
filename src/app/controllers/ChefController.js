const Chef = require('../models/Chef')
const File = require('../models/File')
const { date } = require('../../libs/utils')

module.exports = {
    async index(req, res) {
        const chefs = await Chef.selectAllWithAvatar()
        
        let chefsWithAvatar = []


        chefs.forEach(chef => {
            chef.avatar_url = `${req.protocol}://${req.headers.host}${chef.path.replace('public', '')}`

            chefsWithAvatar.push(chef)
        })

        return res.render('admin/chefs/index', { chefs: chefsWithAvatar })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    },

    async post(req, res) {

        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '' && key != "images") {
                return res.send('please fill in all the fields')
            }
        }

        if (!req.file) {
            return res.send('Please send an image')
        }

        try {
            const fileId = await File.create({ 
                name: req.file.filename,
                path: req.file.path
            })

            
            const chefId = await Chef.create({ 
                name: req.body.name,
                file_id: fileId
            })

            return res.redirect(`/admin/chefs/${chefId}`)
        } catch (err) {
            return console.error(err)
        }

    },

    async show(req, res) {
        const { id } = req.params

        const chef = await Chef.findWithFiles(id)

        if (chef.path) {
            chef.avatar_url = `${req.protocol}://${req.headers.host}${chef.path.replace('public', '')}`
        }

        chef.created_at = date(chef.created_at).format

        if (!chef) {
            return res.send('Chef not found')
        }

        let results = await Chef.selectRecipesOptions(id),
            lastId = 0

        const recipes = []


        results.rows.forEach(recipe => {
            if (recipe.recipe_id != lastId) {
                recipe.src = `${req.protocol}://${req.headers.host}${recipe.path.replace('public', '')}`
                recipes.push(recipe)
            }
            lastId = recipe.recipe_id
        })

        return res.render('admin/chefs/show', { chef, recipes })
    },

    async edit(req, res) {
        const { id } = req.params

        const chef = await Chef.findWithFiles(id)

        if (chef.path) {
            chef.avatar_url = `${req.protocol}://${req.headers.host}${chef.path.replace('public', '')}`
        }
        res.render('admin/chefs/edit', { chef })
    },

    async put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '' && key != "lastFileId") {
                return res.send('please fill in all the fields')
            }
        }

        try {
            if (req.file) {
                let results = await File.createChefFile({ ...req.file })
                const fileId = results.rows[0].id

                const data = {
                    ...req.body,
                    fileId: fileId || null
                }

                await Chef.update({ ...data })

                await File.deleteFileFromChefId(req.body.lastFileId)

            } else {
                const data = {
                    ...req.body,
                    fileId: req.body.lastFileId
                }

                await Chef.update({ ...data })
            }
            return res.redirect(`/admin/chefs/${req.body.id}`)
        } catch (err) {
            console.error(err)
            return res.send('An error has occurred, please try again')
        }
    },

    delete(req, res) {
        const { id } = req.body

        Chef.delete(id, () => {

            res.redirect('/admin/chefs')
        })
    },
}