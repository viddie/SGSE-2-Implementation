const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();


// Hier die Swagger Beschreibungen einfügen
const offers = require('./swagger/offers.json');
const email = require("./swagger/email.json");
const ratings = require("./swagger/ratings.json");
const user = require("./swagger/user.json");

var options = {}

// Und deployen
app.use('/docs-offers', swaggerUi.serveFiles(offers, options), swaggerUi.setup(offers));
app.use('/docs-email', swaggerUi.serveFiles(email, options), swaggerUi.setup(email));
app.use('/docs-ratings', swaggerUi.serveFiles(ratings, options), swaggerUi.setup(ratings));
app.use('/docs-user', swaggerUi.serveFiles(user, options), swaggerUi.setup(user));

// Starte den Server
app.listen(3000, err => {
    if (err)
        throw err
    console.log('Ich bin der Niklas und habe kein Leben')
    console.log('Tristan: "Leider bin ich meinen jungen Jahren schon so ausgebrannt, dass ich einen Hörsturz habe"')

})

