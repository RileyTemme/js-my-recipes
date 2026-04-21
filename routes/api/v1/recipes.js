
const router = require('express').Router()
const data = require('../../../data/recipes.json')

router.get('/', (req, res) => {
    const recipes = data.map(({ id, title, image, prepTime, difficulty }) => ({id, title, image, prepTime, difficulty       
    }))

    res.send(recipes)
})


router.post('/recipe/add', (req, res) => {
    const id = data.length + 1
    const { title, image, description, ingredients, instructions, prepTime, difficulty } = req.body

    const result = data.push({ id, title, image, description, ingredients, instructions, prepTime, difficulty }) 

    if (result) {
        res.status(201).json({message: 'item added', item: data[id-1] })
    }
})

router.get('/recipe/:id', (req, res) => {
    const { id } = req.params
    const recipe = data[id - 1]

    if (recipe) {
        return res.status(201).send(recipe) 
    }

    res.status(404).json({ message: `error: recipe ${id} not found`})
})

module.exports = router