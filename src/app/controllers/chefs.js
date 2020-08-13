const Chef = require('../models/Chef')
const { date } = require('../../libs/utils')

exports.index = (req, res) => {

    Chef.all(function (chefs) {
        return res.render('admin/chefs/index', { chefs })
    })
    
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == '') {
            return res.send('please fill in all the fields')
        }
    }

    Chef.create(req.body, (chef) => {
        return res.redirect(`/admin/chefs/${chef.id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params
    
    Chef.find(id, (chef) => {
        
        if (!chef) {
            return res.send('Chef not found')
        }

        chef.created_at = date(chef.created_at).format

        return res.render('admin/chefs/show', { chef: chef })
    }) 
}

exports.edit = (req, res) => {
    const { id } = req.params

    Chef.find(id, (chef) => {
        if (!chef) {
            return res.send('Chef not found')
        }

        res.render('admin/chefs/edit', { chef } )
    })
    
}

exports.put = (req, res) => {
    Chef.update(req.body, (chef) => {

        res.redirect(`/admin/chefs/${req.body.id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body
    Chef.delete(id, () => {

        res.redirect('/admin/chefs')
    })
}