const db = require('../../config/db')

module.exports = {
    create({file, path, product_id}) {
        const query = `
            INSERT INTO recipes (
                name,
                path,
            ) VALUES ($1, $2)
            RETURNING id `

        const values = [
            params.chef_id,
            params.image,
            params.title,
            params.ingredients,
            params.preparation,
            params.information,
            date(Date.now()).iso,
        ]

        return db.query(query, values)
    },
}
