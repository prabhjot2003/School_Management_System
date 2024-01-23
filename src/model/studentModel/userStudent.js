const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const createdAt = require('../timeData/updatedSchema')





const mySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },
   
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number
    },
    dateOfbirth: {
        type: Number
    },
    email: {
        type: String,
        type: String,
        required: true,
        unique: true

    },
    phoneNo: {
        type: Number
    },
    fatherName: {
        type: String
    },
    motherName: {
        trype: String
    },
    gender: {
        type: String
    },
    fatherOccupation: {
        type: String
    },
    motherOccupation: {
        type: String
    },
    schooId: {
        type: String,
        ref: 'School',
        required: true
    },
    classId: {
        type: String,
        ref: "Class",
        required: true
    },
    sectionId: {
        type: String,
        ref: "section",
        required: true

    },
    createdAt



});

const modelStudent = mongoose.model('Student', mySchema);

module.exports = modelStudent;