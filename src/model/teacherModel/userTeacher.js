const mongoose = require('mongoose');
const { nanoid } = require("nanoid");

const mySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },

    firstName: {
        type: String,


    },

    lastName: {
        type: String,

    },

    dateOfBirth: {
        type: Date,

    },
    contact: {
        type: Number,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true
    },

    schooId: {
        type: String,
        ref: 'School',
    },


});

const modelTeacher = mongoose.model('Teacher', mySchema);

module.exports = modelTeacher;