const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
            SELECT recipes.*, count(chefs) AS total_chefs
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            GROUP BY recipes.id
            ORDER BY recipes.updated_at DESC
        `, function (err, results) {
            if (err) throw `Database error!! ${err}`

            callback(results.rows)
        })
    },

    async create(params) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                user_id,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id`

        const values = [
            params.chef_id,
            params.title,
            params.ingredients,
            params.preparation,
            params.information,
            params.user_id || 1,
            `now()`,
        ]

         const results = await db.query(query, values)

         return results.rows[0].id
    },

    async find(id) {
        let results = await db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id])

        return results.rows[0]
    },

    async findBy(filter) {
        const results = await db.query(`
        SELECT recipes.*, chefs.name AS chef_name, files.name AS filename, files.path
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
        LEFT JOIN files ON (recipe_files.file_id = files.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'
        ORDER BY recipes.updated_at ASC
        `)

        return results.rows
    },

    async selectAllWithChefNamesAndFiles() {
        let results = await db.query(`SELECT recipes.*, chefs.name AS chef_name, files.name AS filename, files.path
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
        LEFT JOIN files ON (recipe_files.file_id = files.id)
        ORDER BY recipes.updated_at DESC`)

        return results.rows
    },

    async selectByUserIdWhitChefNamesAndFiles(id) {
        return db.query(`SELECT recipes.*, chefs.name AS chef_name, files.name AS filename, files.path
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
        LEFT JOIN files ON (recipe_files.file_id = files.id)
        WHERE recipes.user_id = $1
        ORDER BY recipes.updated_at DESC`, [id])
    },

    async update(params) {
        const query = `
            UPDATE recipes SET
                chef_id = ($1),
                title = ($2),
                ingredients = ($3),
                preparation = ($4),
                information = ($5)
            WHERE id = $6
            RETURNING id`

        const values = [
            params.chef_id,
            params.title,
            params.ingredients,
            params.preparation,
            params.information,
            params.id
        ]

        return db.query(query, values)
    },

    async selectChefOptions() {
        let results = await db.query(`SELECT name, id FROM chefs`)
        
        return results.rows
    },

    async delete(id) {
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    }
}
