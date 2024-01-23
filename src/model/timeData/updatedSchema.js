const moment = require('moment')
const timeSpace = {

    time: {
        type: Number,
        default: moment()
    },



    created_at:
    {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

};

module.exports = {
    timeSpace,
}