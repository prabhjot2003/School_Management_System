const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema')



const mySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },
   
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        unique: true,

    },
    image: {
        type: String
    },
    establishedYear: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt


});

const modelSchool = mongoose.model('School', mySchema);

module.exports = modelSchool;