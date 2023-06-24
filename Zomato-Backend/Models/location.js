const mongoose = require('mongoose');

const Schema = mongoose.Schema;   //copying or importing mongoose Schema

const locationSchema = new Schema({
    name : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('loc', locationSchema, 'location');