const mongoose = require('mongoose');

const Schema = mongoose.Schema;   //copying or importing mongoose Schema

const restaurantSchema = new Schema({
    city: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number
    }
})

module.exports = mongoose.model('res', restaurantSchema, 'restaurants');