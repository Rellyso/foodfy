const fs = require('fs')
const data = require('../data.json')

exports.index = (req, res) => {
    return res.render('admin/index', {recipes: data.recipes})
}

exports.create = (req, res) => {
    return res.render('admin/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)


    for (let key of keys) {
        if (req.body[key] == "") return res.send('Please fill in all fields.')
    }

    let { image, title, author, ingredients, preparation, information } = req.body

    data.recipes.push({
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    })
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error.')
    })

    return res.redirect('/admin/recipes')
}