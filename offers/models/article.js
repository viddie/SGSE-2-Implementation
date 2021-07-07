const mongoose = require('mongoose');

// Artikelschema anlegen
const articleSchema = new mongoose.Schema({
    sellerID: Number,
    sellerName: String,
    buyerID: Number,
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
 
 
 
