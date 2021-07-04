const express = require("express")
const app = express()
const mongoose = require('mongoose')

const PORT = 8080;

const mongo_client = new MongoClient("mongodb://root:passwort123!@172.17.0.8:27017"); //user DB
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

const subroutes = require("./routes/ratings")
app.use("/ratings", subroutes)

app.listen(PORT, () => console.log("Server Started"))
