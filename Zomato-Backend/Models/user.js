const mongoose = require('mongoose');

const Schema = mongoose.Schema;   //copying or importing mongoose Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserDetails', userSchema, 'user');