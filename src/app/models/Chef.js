const db = require('../../config/db')
const { date } = require('../../libs/utils')

module.exports = {
    all() {
        return db.query(`SELECT * FROM chefs ORDER BY name ASC`)
    },

    create({ name, fileId }) {
        const query = `
        INSERT INTO chefs (
            name,
            file_id,
            created_at
            ) VALUES ($1, $2, $3)
            RETURNING id`

        const values = [
            name,
            fileId,
            date(Date.now()).iso,
        ]

        return db.query(query, values)
    },

    find(id) {
        return db.query(`SELECT chefs.*, files.path, files.id AS file_id, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        LEFT JOIN files ON (chefs.file_id = files.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id, files.path, files.id`, [id])
    },

    selectAllWithAvatar() {
        return db.query(`
            SELECT chefs.*, files.path 
            FROM files, chefs 
            WHERE chefs.file_id = files.id
            ORDER BY chefs.name ASC
        `)
    },

    selectChefsWithTotalRecipes() {
        return db.query(`
            SELECT chefs.*, files.path, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            LEFT JOIN files ON (chefs.file_id = files.id)
            GROUP BY chefs.id, files.path
        `)
    },

    selectRecipesOptions(id) {
        return db.query(`
            SELECT files.name AS filename, files.path, files.id AS file_id, recipes.id AS recipe_id, recipes.title
            FROM files, recipes, recipe_files
            WHERE recipe_files.file_id = files.id
            AND recipe_files.recipe_id = recipes.id
            AND recipes.chef_id = $1   
        `, [id])
    },

    async update({ name, fileId = null, id }) {
        const query = `
            UPDATE chefs SET
                name = $1,
                file_id = $2
            WHERE id = $3`

        const values = [
            name,
            fileId,
            id
        ]

        return db.query(query, values)
    },

    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error! ${err}`

            callback()
        })
    }
}
