const express = require("express")
const app = express()
const mongoose = require('mongoose')

const PORT = 8080;


mongoose.connect("mongodb://172.17.0.6:27017", {
    "auth": { "authSource": "admin" },
    "user": "root",
    "pass": "passwort123!",
});

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connection to MongoDB succesful'))

app.use(express.json())

const messages = require("./routes/messages")
app.use("/messages", messages)

const config = require("./routes/configuration")
app.use("/configuration", config)

app.listen(PORT, () => console.log("Server Started"))

// export app for testing
module.exports = app;
