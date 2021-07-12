const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();


// Hier die Swagger Beschreibungen einfügen
const offers = require('./swagger/offers.json');
const email = require("./swagger/email.json");

var options = {}

// Und deployen
app.use('/docs-offers', swaggerUi.serveFiles(offers, options), swaggerUi.setup(offers));
app.use('/docs-email', swaggerUi.serveFiles(email, options), swaggerUi.setup(email));

// Starte den Server
app.listen(3000, err => {
    if (err)
        throw err
    console.log('Ich bin der Niklas und habe kein Leben')
})

