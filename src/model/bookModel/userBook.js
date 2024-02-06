const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema');

const bookSchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },

    libaryId: {
        type: String,
        ref: 'Libary',
        required: true
    },
    categoryId:{
        type: String,
        ref : "Category",
        required: true
    },

    author: {
        type: String
    },

   
     isbn: {
        type: Number,
        unique: true
    },

    title :{
        type: String,
        required: true
    },

    slug :{
        type: String,
        slug : "title"
        
    },
    isReturn:{
        type : Boolean,
        default: false
    },
    

    createdAt

});
const modelBook = mongoose.model('Book', bookSchema);

module.exports = modelBook;
