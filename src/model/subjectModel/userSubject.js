const mongoose = require('mongoose');
const { nanoid } = require("nanoid");

const mySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },

    name: {
        type: String,
        required: true
    },
    
    slug: {
        type: String,
        slug: "name"
    },

});

const modelSubject = mongoose.model('Subject', mySchema);

module.exports = modelSubject;