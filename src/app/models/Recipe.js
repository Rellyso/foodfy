const db = require('../../config/db')
const { date } = require('../../libs/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT recipes.*, count(chefs) AS total_chefs
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            GROUP BY recipes.id
        `, function (err, results) {
            if (err) throw `Database error!! ${err}`

            callback(results.rows)
        })
    },

    create(params) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id`

        const values = [
            params.chef_id,
            params.title,
            params.ingredients,
            params.preparation,
            params.information,
            date(Date.now()).iso,
        ]

        return db.query(query, values)
    },

    find(id, callback) {
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id], (err, results) => {
            if (err) throw `Database error!! ${err}`

            callback(results.rows[0])
        })
    },

    findBy(filter, callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name  
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'
        ORDER BY recipes.title ASC
        `, (err, results) => {
            if (err) throw `Database error!! ${err}`

            callback(results.rows)
        })
    },

    selectAllWithChefNames(callback) {
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `, (err, results) => {
            if (err) throw `Database error!! ${err}`

            callback(results.rows)
        })
    },

    update(params, callback) {
        const query = `
            UPDATE recipes SET
                chef_id = ($1),
                image = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = $7
            RETURNING id`

        const values = [
            params.chef_id,
            params.image,
            params.title,
            params.ingredients,
            params.preparation,
            params.information,
            params.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    selectChefOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, (err, results) => {
            if (err) throw `Database error! ${err}`

            callback(results.rows)

        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error! ${err}`

            callback()
        })
    }
}
