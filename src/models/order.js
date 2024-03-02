const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    creationTime:{
        type: Date,
        // required: true,
    },
    deliveryTime:{
        type: String,
        // trim: true
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true
    },
    orderAmount:{
        type: Number,
        required: true,
        trim: true
    },
    feedback:{
        type: String,
        required: true,
        trim: true
    },
    foodItems:{
        type: Array,
        required: true
    }
}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;