const express = require('express')
const path = require('path');
const app = express()
const port = 3001

var public = path.join(__dirname, 'public');

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));

app.listen(8080);

// Start server
app.listen(port, function () {
  console.log('Server up and running on the pod! ', `http://localhost:${port}/`);
});