const express = require('express');
const fetch = require('node-fetch');
var mysql = require('mysql');
const {MongoClient} = require('mongodb');

const app = express();
const port = 30100;

var con = mysql.createConnection({
  host: "172.17.0.8",
  user: "root",
  password: "passwort123!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// const mongo_client = new MongoClient("mongodb://root:passwort123!@172.17.0.17:27017"); //user DB
// async function main(){
//   try {
//     await mongo_client.connect();
//     console.log("Connected to mongoDB!");
//   } catch (e) {
//       console.error(e);
//   } finally {
//       await mongo_client.close();
//   }
// }
// main().catch(console.error);


app.get('/', (req, res) => {
  console.log('Got request for /');
  res.send('Hello World!');
});


app.get('/test', (req, res) => {
  console.log('Got request for /test');
  fetch("http://sgse2.ad.fh-bielefeld.de/api/echo").then(res => res.text()).then(text => {
    res.send('Some example fetch -> '+text);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
