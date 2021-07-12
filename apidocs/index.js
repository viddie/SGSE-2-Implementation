const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use('/', swaggerUi.serve);

// Hier die Swagger Beschreibungen einfügen
const offers = require('./swagger/offers.json');
// Und deployen
app.get('/offers', swaggerUi.setup(offers));

// Starte den Server
app.listen(3000, err => {
    if (err)
        throw err
    console.log('Ich bin der Niklas und habe kein Leben')
})

