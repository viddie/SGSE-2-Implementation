const express = require('express')
const path = require('path');
const app = express()
const port = 3001


app.get('/', function (req, res) {
  console.log('###GET REQUEST received');
  res.sendFile(__dirname + '/public/index.html'); 
});

app.get('/App.js', function (req, res) {
  console.log('###GET REQUEST received');
  res.sendFile(__dirname + '/public/App.js'); 
});

// Start server
app.listen(port, function () {
  console.log('Server up and running on the pod!');
});