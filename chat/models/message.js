const mongoose = require('mongoose')

const message_subsschema = new mongoose.Schema({
    room: 
    {
        type: String,
        required: true
    },

    sender: {
        type: String,
        required: true
    },

    senderID: {
        type: String,
        required: true
    },
    
    receiver: {
        type: String,
        required: true
    },

    receiverID: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },
    
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
}
)

module.exports = mongoose.model('Message', message_subsschema)
