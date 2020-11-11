const db = require('../../config/db')

module.exports = {
    async findOne(filters) {
        let query = `
            SELECT * FROM users
        `

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `
            // SELECT * FROM users WHERE

            Object.keys(filters[key]).map(field => {
                // field -> name: email, value: example@mail.com
                query = `${query} ${field} = '${filters[key][field]}'`
                // SELECT * FROM users WHERE email = example@mail.com
            })
        })

        try {
            const results = await db.query(query)

            return results.rows[0] || null
        } catch (err) {
            console.error(err)
        }
    },

    async listAll() {
        const results = await db.query(`SELECT * FROM users`)
        
        return results.rows
    }
}
