const mongoose = require('mongoose')

const RatingsSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
    },
    avgStar: 
    {
        required: true,
        type: Number,
        default: 0
    },
    totalRatings: 
    {
        required: true,
        type: Number,
        default: 0
    },
    RaterIDs:
    {
        required: true,
        type: [String],
        default: []
    },
    MappedRatings:
    {
        required: true,
        type: [Number],
        default: []
    }
}

)

module.exports = mongoose.model('Ratings', RatingsSchema)
