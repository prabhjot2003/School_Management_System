const mongoose = require('mongoose');
const { nanoid } = require("nanoid");

const mySchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid()
    },
    subjectId: {
        type: String,
        ref: "subjects",
        required: true,

    },
    teacherId: {
        type: String,
        ref: "teachers",
        required: true
    },
    classId :{  
        type: String,
        ref: "class",
        required: true

    }
});

const modelthree = mongoose.model('threetable', mySchema);

module.exports = modelthree;