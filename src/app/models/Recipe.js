const db = require('../../config/db')
const { query } = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, function (err, results) {
            if (err) throw 'Database error!!'

            callback(results.rows)
        })
    },
    create(params, callback) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            
        ]
    }
}