const express = require('express');
const fetch = require('node-fetch');
var mysql = require('mysql');
const {MongoClient} = require('mongodb');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbHost = "172.17.0.8";

const port = 30100;

var con = mysql.createConnection({
  host: dbHost,
  user: "root",
  password: "passwort123!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to '"+dbHost+"'!");
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


app.post('/test2', (req, res) => {
  console.log('Got request for /test2');
  res.send('This is from the different path /test2. Body of request: '+JSON.stringify(req.body));
});

app.get('/ci-cd', (req, res) => {
  console.log('Got request for /ci-cd');
  res.send('CI/CD test interface');
});

app.get('/emailpw', (req, res) => {
  console.log('Got request for /emailpw');
  res.send('Email login: username -> '+process.env.EMAIL_USERNAME+', password -> '+process.env.EMAIL_PASSWORD);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
