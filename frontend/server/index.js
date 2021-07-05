const express = require('express')
const path = require('path');
const app = express()
const port = 3001

app.use(express.static(__dirname + '/public', {index: false}))
app.get('/', function (req, res) {
  console.log('###GET REQUEST received');
  console.log(req);
  res.sendFile(__dirname + '/public/index.html'); 
});
// Start server
app.listen(port, function () {
  console.log('Server up and running on the pod!');
});