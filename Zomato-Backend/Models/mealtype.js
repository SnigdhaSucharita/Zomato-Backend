const mongoose = require('mongoose');

const Schema = mongoose.Schema;   //copying or importing mongoose Schema

const mealtypeSchema = new Schema({
    name : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('meal', mealtypeSchema, 'mealtype');