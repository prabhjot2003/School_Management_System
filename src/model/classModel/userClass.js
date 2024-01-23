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

  schooId: {
    type: String,
    ref: 'School',
    required: true

  },

  isActive: {
    type: Boolean,
    default: true,
  },

  slug: {
    type: String,
    slug: "Name"
  },
  createdAt

});
const modelClass = mongoose.model('Class', mySchema);

module.exports = modelClass;
