const mongoose = require('mongoose')

const configuration_subsschema = new mongoose.Schema({
    id: 
    {
        type: Number,
        required: true
    },

    userID: {
        type: String,
        required: true
    },

    allowMessages: {
        type: Boolean,
        default: true,
        required: true
    },

    openChatOnNewMessage: {
        type: Boolean,
        default: true,
        required: true
    },
    
    fontSize: {
        type: String,
        required: true
    },

    windowSize: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Configuration', configuration_subsschema)