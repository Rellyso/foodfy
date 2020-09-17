const db = require('../../config/db')
const { find } = require('./Recipe')

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

    getFilesByRecipeId(recipe_id) {
        return db.query(`
            SELECT files.* FROM recipes, recipe_files, files
            WHERE recipes.id = recipe_files.recipe_id 
            AND recipe_files.file_id = files.id
            AND recipes.id = $1`, [recipe_id])

    },

    getFile(file_id) {
        try {
            return db.query(`SELECT * FROM files WHERE id = $1`, [file_id])

        } catch (err) {
            throw `Database Error => ${err}`
        }
    },

    async recipeFiles(recipe_id) {
        try {
            let results = await db.query(`SELECT * FROM recipe_files WHERE recipe_id = $1`, [recipe_id])

            return results
        } catch (err) {
            return `Database error: ${err}`
        }
    }
}
