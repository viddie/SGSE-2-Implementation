const express = require("express")
const app = express()
const mongoose = require('mongoose')

const PORT = 8080;

const mongo_client = new MongoClient("mongodb://root:passwort123!@172.17.0.6:27017/chat");
async function main(){
    try {
        await mongo_client.connect();
        console.log("Connected to mongoDB!");
    } catch (e) {
        console.error(e);
    } finally {
        await mongo_client.close();
    }
}
main().catch(console.error);

app.use(express.json())

const messages = require("./routes/messages")
app.use("/messages", messages)

const config = require("./routes/configuration")
app.use("/configuration", config)

app.listen(PORT, () => console.log("Server Started"))

// export app for testing
module.exports = app;