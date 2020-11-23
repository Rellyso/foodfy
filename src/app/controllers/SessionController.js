const crypto = require('crypto')
const mailer = require('../../libs/mailer')
const User = require('../models/User')

module.exports = {
    async loginForm(req, res) {
        return res.render('session/login')
    },

    async login(req, res) {
        const { user } = req
        req.session.userId = req.user.id
        res.locals.isAdmin = user.is_admin

        console.log(res.locals.isAdmin)
        
        return res.redirect('/admin')
    },
    
    async logout(req, res) {
        req.session.destroy()
        res.locals.isAdmin = false
        console.log(res.locals.isAdmin)
        
        return res.redirect('/login')
    },

    forgotForm(req, res) {
        return res.render('session/forgot')
    },

    async forgot(req, res) {
        try {
            const { user } = req

            //create an user token
            const token = crypto.randomBytes(20).toString('hex')

            //create expires
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            //add token on db
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now,
            })

            //send an email with reset password token link 
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: `${user.name}, sua recuperação de senha está pronta`,
                html: `
                    <h1>Precisa de uma nova senha?</h1>
                    <p>Deixa conosco, Chefe! clique no link abaixo para recuperar sua senha: </p>
                    <p>
                        <a href="http://localhost:3000/password-reset?token=${token}" target="_blank">
                            RECUPERAR SENHA
                        </a>
                    </p>
                `
            })

            // notify user we sent an email
            return res.render('session/forgot', {
                success: 'Enviamos um link de recuperação para seu email. Confira!'
            })
        } catch(err) {
            console.error(err)
            return res.render('session/forgot', {
                error: 'Ocorreu um erro. Entre em contato conosco em reply@foodfy.com.br'
            })
        }
    },

    resetForm(req, res) {
        return res.render('session/password-reset', { token: req.query.token })
    },

    async reset(req, res) {
        const { user } = req
        const { password, token } = req.body

        try {
            // atualizar usuário
            await User.update(user.id, {
                password,
                reset_token: '',
                reset_token_expires: '',
            })

            // avisar usuário que tem uma nova senha
            return res.render('session/login', {
                user: req.body,
                success: "Senha atualizada com sucesso! Faça seu login"
            })

        } catch (err) {
            console.error(err)
            return res.render('session/reset', {
                user: req.body,
                token,
                error: 'Ocorreu um erro. Entre em contato conosco em reply@foodfy.com.br'
            })
        }
    }

}