const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    availability: {
        type: Boolean,
        default: false,
        required: false
    },
    ingridents: {
        type: Array,
        required: true,
    },
    ratingValue:{
        type: Number
    },
    ratingCount:{
        type: Number
    },
    price:{
        type: Number,
        required: true
    },
    veg:{
        type: Boolean,
        required:true
    }
}, {
    timestamps: true
})



const Food = mongoose.model('Food', foodSchema);

module.exports = Food