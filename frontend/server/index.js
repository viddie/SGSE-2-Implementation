const express = require('express')
const path = require('path');
const app = express()
const port = 3001

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){

  // save html files in the `views` folder...
  res.sendFile(__dirname + "/views/index.html");
});
// Start server
app.listen(port, function () {
  console.log('Server up and running on ', `http://localhost:${port}/`);
});