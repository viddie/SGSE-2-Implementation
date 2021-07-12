const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./offers.json');

const app = express();
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

// Starte den Server

app.listen(22222, err => {
    if (err)
        throw err
    console.log('Ich bin der Niklas und habe kein Leben')
})

