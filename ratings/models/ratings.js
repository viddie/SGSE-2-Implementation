const mongoose = require('mongoose')

const RatingsSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Five_Star: {
        type: Number,
        required: true,
        default: 0
    },
    Four_Star: {
        type: Number,
        required: true,
        default: 0
    },
    Three_Star: {
        type: Number,
        required: true,
        default: 0
    },
    Two_Star: {
        type: Number,
        required: true,
        default: 0
    },
    One_Star: {
        type: Number,
        required: true,
        default: 0
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
    }
}

)

module.exports = mongoose.model('Ratings', RatingsSchema)
