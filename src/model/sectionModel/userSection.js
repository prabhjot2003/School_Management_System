const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema')




const mySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },
    Name: {
        type: String
    },

    classId: {
        type: String,
        ref: "Class",
        required: true
    },  
    slug :{
        type: String,
        slug : "Name"
    },
    createdAt

    
});

const modelSection = mongoose.model('Section', mySchema);

module.exports = modelSection;