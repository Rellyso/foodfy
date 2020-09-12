const db = require('../../config/db')

module.exports = {
    create({filename, path}) {
        const query = `
            INSERT INTO recipes (
                name,
                path,
            ) VALUES ($1, $2)
            RETURNING id 
            INSERT INTO recipe_files ()` // continuar
            

        const values = [
            file
        ]

        return db.query(query, values)
    },
}
