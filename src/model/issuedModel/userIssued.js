const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema')


const issueSchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },

    studentId:{  
        type: String,
        ref: 'Student',
        required: true
    },
    issueDate: { 
        type: String,
        default: Date 
    },

    returnDate: { 
        type: String,
        default: Date 
    },
    
    bookId :{
        type : String,
        ref: "book",
        required : true
    },
    
    bookFee : {
        type: Number,
        required: true
    },
    
    createdAt

});
const modelIssued = mongoose.model('Issued', issueSchema);

module.exports = modelIssued;
