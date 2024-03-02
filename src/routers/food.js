const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const Food = require('../models/food')

//create order
router.post('/item', async (req, res) => {
    const food = new Food({
        ...req.body
    })

    try {
        await food.save()
        res.status(201).send(food)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/foods', async (req, res) => {
    try {
        const allFoods = await Food.find();
        res.status(201).send(allFoods)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Read/list a particular food
router.get('/foods/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const food = await Food.findOne({ _id})

        if (!food) {
            return res.status(404).send()
        }

        res.send(food)
    } catch (e) {
        res.status(500).send()
    }
});

// Update an by ID - 
router.patch('/foods/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const food = await Food.findOne({ _id: req.params.id });

        if (!food) {
            return res.status(404).send()
        }

        updates.forEach(update => food[update] = req.body[update]);
        await food.save();

        res.send(food)
    } catch (e) {
        res.status(400).send(e)
    }
})


// delete an by ID - 
router.delete('/foods/:id', auth, async (req, res) => {
    try {
        const food = await Food.findOneAndDelete({ _id: req.params.id })

        if (!food) {
            res.status(404).send()
        }

        res.send(food)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router