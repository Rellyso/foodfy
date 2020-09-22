const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    async create({ filename, path, recipe_id }) {
        try {
            let query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
            `

            let values = [
                filename,
                path,
            ]
            const result = await db.query(query, values)
            const fileId = result.rows[0].id

            query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2) `

            values = [
                recipe_id,
                fileId
            ]

            return db.query(query, values)
        } catch (err) {
            throw `Database Error => ${err}`
        }
    },

    createChefFile({ filename, path }) {
        try {
            return db.query(`
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
        `, [filename, path])
        } catch (err) {
            throw `Error at: ${err}`
        }
    },

    selectFromFileId(id) {
        return db.query(`
            SELECT files.path FROM files, chefs WHERE chefs.file_id = files.id AND chefs.file_id = $1
        `, [id])
    },

    getFilesByRecipeId(recipe_id) {
        return db.query(`
            SELECT files.* FROM recipes, recipe_files, files
            WHERE recipes.id = recipe_files.recipe_id 
            AND recipe_files.file_id = files.id
            AND recipes.id = $1`, [recipe_id])

    },

    async deleteFileFromRecipe(id) {
        try {
            let result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])

            const file = result.rows[0]

            fs.unlinkSync(file.path)

            await db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id])
            return db.query(`DELETE FROM files WHERE id = $1`, [id])
        } catch (err) {
            console.error(err)
        }
    },

    async deleteFilesFromRecipe(id) {

        let results = await db.query(`
            SELECT files.id FROM files, recipe_files, recipes
            WHERE recipe_files.recipe_id = recipes.id
            AND recipe_files.file_id = files.id
            AND recipes.id = $1
            `, [id])

        const files = results.rows

        const filesPromise = files.map(file => this.deleteFileFromRecipe(file.id))
        await Promise.all(filesPromise)
    },
    
    async deleteFileFromChefId(id) {
        try {
            let result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)

            return db.query(`DELETE FROM files WHERE id = $1`, [id])
        } catch (err) {
            console.error(err)
        }
    },
}
