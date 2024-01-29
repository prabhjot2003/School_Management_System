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
});

const modelLinking = mongoose.model('Linking', mySchema);

module.exports = modelLinking;