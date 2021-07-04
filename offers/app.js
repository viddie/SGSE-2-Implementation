const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
session = require('express-session'),

// Lade Konfigurationsdatei um einfacher zwischen Dockercontainer und Entwicklungsumgebung zu wechseln
require('dotenv/config');
const isProduction = process.env.NODE_ENV === 'production';
// Globales Express Server Object erstellen
const app = express();

// Konfiguration des Express Servers

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

// Mit MongoDB verbinden
mongoose.connect(process.env.MONGO_URL,
   { useNewUrlParser: true, useUnifiedTopology: true }, err => {
       console.log('Mit MongoDB verbunden!')
   }
);

// Lade die Artikelmodellierung
require('./models/Article');

// Lade die Routen
app.use(require('./routes'));

// Errorhandling
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// Mit Stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({'errors': {
        message: err.message,
        error: err
        }});
    });
}
  
// Ohne Stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: {}
    }});
});

// Starte den Server
var port = process.env.PORT
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})




