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

            // const recipeFiles = results.rows

            // let files = []
            // recipeFiles.map(async recipeFile => {
            //     let result = await db.query(`SELECT * FROM files WHERE id = $1`, [recipeFile.file_id])
            //     let file = result.rows
                
            //     files.push(file)
            // })

            return results
        } catch (err) {
            return `Database error: ${err}`
        }
    }
}
