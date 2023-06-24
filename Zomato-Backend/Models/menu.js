const mongoose = require('mongoose');

const Schema = mongoose.Schema;   //copying or importing mongoose Schema

const menuSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    restaurantId : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('menuItems', menuSchema, 'menu');