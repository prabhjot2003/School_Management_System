const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema');

const libarySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },

    schooId: {
        type: String,
        ref: 'School',
        required: true
    },

    contact: {
        type: Number,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    
    createdAt

});
const modelLibary = mongoose.model('Libary', libarySchema);

module.exports = modelLibary;
