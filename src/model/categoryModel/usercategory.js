const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema');


const CategorySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },

    libaryId: {
        type: String,
        ref: 'Libary',
        required: true
    },

    name: {
        type: String,
        required:true

    },
    createdAt
    

});
const modelCategory = mongoose.model('Category', CategorySchema);

module.exports = modelCategory;
