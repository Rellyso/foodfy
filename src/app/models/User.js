const db = require('../../config/db')
const { hash } = require('bcryptjs')

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

    async create(data) {
        try {
            const password = data.password || 'admin1234'

            const query = `
            INSERT INTO users (
                name,
                email,
                password,
                is_admin
            ) VALUES ($1, $2, $3, $4)
            RETURNING id
        `
            const hashPassword = await hash(password, 8)

            const values = [
                data.name,
                data.email,
                hashPassword,
                data.isAdmin,
            ]

            const results = await db.query(query, values)
            const user = results.rows[0]

            return user.id
        } catch (err) {
            console.error(err)
        }
    },

    async listAll() {
        try {
            const results = await db.query(`SELECT * FROM users`)

            return results.rows
        } catch (err) {
            console.error(err)
        }
    },

    async update(id, fields) {

        if (fields.password) {
            fields.password = await hash(fields.password, 8)
        }

        try {
            let query = `UPDATE users SET`

            Object.keys(fields).map( (key, index, array) => {

                // if not key
                if ((index + 1) < array.length) {
                   
                    query = ` ${query} 
                        ${key} = '${fields[key]}',` 
                } else {
                    // if last key

                    query = ` ${query}
                        ${key} = '${fields[key]}'
                        WHERE id = ${id}`
                }


            })

            await db.query(query)

            return 

        } catch (err) {
            console.error(err)
        }
    },

    async delete(id) {
        await db.query(`DELETE FROM users WHERE id = $1`, [id])

        return
    }
}
