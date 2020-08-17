const db = require('../../config/db')
const { date } = require('../../libs/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs ORDER BY name ASC`, function (err, results) {
            if (err) throw 'Database error!!'

            callback(results.rows)
        })
    },

    create(params, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id `

        const values = [
            params.name,
            params.avatar_url,
            date(Date.now()).iso,
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error!! ${err}`

            callback(results.rows[0]) // retorna objeto com id dentro
        })
    },

    find(id, callback) {
        db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], (err, results) => {
            if (err) throw `Database error!! ${err}`

            callback(results.rows[0])
        })
    },

    selectRecipesOptions(id, callback) {
        db.query(`
            SELECT recipes.title, recipes.image
            FROM recipes
            WHERE recipes.chef_id = $1
        `, [id], (err, results) => {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    update(params, callback) {
        const query = `
            UPDATE chefs SET
                name = $1,
                avatar_url = $2
            WHERE id = $3`

        const values = [
            params.name,
            params.avatar_url,
            params.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error! ${err}`

            callback()
        })
    }
}
