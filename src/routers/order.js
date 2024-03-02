const express = require('express')
const Order = require('../models/order')
const router = new express.Router()
const auth = require('../middleware/auth.js')

//create order
router.post('/order',auth, async (req, res) => {

    const order = new Order({
        ...req.body,
        owner: req.user._id
    })
    console.log('risi - placing order', order)

    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
});

// Read/list all order
router.get('/orders', auth, async (req, res) => {
    
    const match = {};
    const sort = {};

    if (req?.query?.completed) {
        match.completed = req.query.completed === 'true';
        console.log(match)
    }

    if (req?.query?.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const user = req.user;
        await user.populate({
            path: 'orders',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        console.log(user.orders)
        res.send(user.orders)
    } catch (e) {
        console.log('risi - error', e)
        res.status(500).send()
    }
})

// Read/list a particular order
router.get('/orders/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const order = await Order.findOne({ _id, owner: req.user._id })

        if (!order) {
            return res.status(404).send()
        }

        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

// Update an by ID - for feedback / completed
router.patch('/orders/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed','feedback']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const order = await Order.findOne({ _id: req.params.id, owner: req.user._id });

        if (!order) {
            return res.status(404).send()
        }

        updates.forEach(update => order[update] = req.body[update]);
        await order.save();

        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router