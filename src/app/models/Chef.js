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
        db.query(`SELECT * FROM chefs WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error!! ${err}`

            callback(results.rows[0])
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
