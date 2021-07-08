const mongoose = require('mongoose');

// Artikelschema anlegen
const articleSchema = new mongoose.Schema({
    sellerID: String,
    sellerName: String,
    buyerID: String,
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
 
 
 
