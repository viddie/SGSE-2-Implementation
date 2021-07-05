const express = require('express')
const path = require('path');
const app = express()
const port = 3001

app.use(express.static(__dirname + '/public', {index: false}))
app.get('/', function (req, res) {
  console.log('###GET REQUEST received');
  res.sendFile(__dirname + '/public/App.js'); 
});
// Start server
app.listen(port, function () {
  console.log('Server up and running on the pod!');
});