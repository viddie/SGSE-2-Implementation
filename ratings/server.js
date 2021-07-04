const express = require("express")
const app = express()
const mongoose = require('mongoose')

const PORT = 80;

mongoose.connect('mongodb://172.17.0.8:27017/ratings',  {useUnifiedTopology: true } , { useNewUrlParser: true } )
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected succesfully'))

app.use(express.json())

const subroutes = require("./routes/ratings")
app.use("/ratings", subroutes)

app.listen(PORT, () => console.log("Server Started"))