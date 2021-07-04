const mongoose = require('mongoose');

// Artikelschema anlegen
const articleSchema = new mongoose.Schema({
    articleID: Number,
    sellerID: Number,
    heading: String,
    description: String,
    category: String,
    price: Number,
    tags: [{
        type: String
    }],
    pictures:
    [{
        type: String
    }],
    startedOn : Date,
    endsOn : Date
});
 
mongoose.model('Article', articleSchema);
 
 
 
