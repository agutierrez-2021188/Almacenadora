'use strict'

const mongoose = require('mongoose')

const cellarSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    location: { type: String, required: true},
    size: {type: String, required: true},
    availability: {type: String, required: false, default: 'Available', lowercase: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Cellars', cellarSchema);