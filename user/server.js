const express = require("express")
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

const PORT = 7070;

mongoose.connect('mongodb://mongo:27017/auth',  {useUnifiedTopology: true } , { useNewUrlParser: true } )
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected succesfully'))

app.use(express.json())
app.use(bodyParser.json());

const subroutes = require("./routes/auth")
app.use("/auth", subroutes)

app.listen(PORT, () => console.log("Server Started"))
