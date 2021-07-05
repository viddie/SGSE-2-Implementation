const express = require('express')
const path = require('path');
const app = express()
const port = 3001

app.get('/', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.use(express.static(__dirname + '/dist'));

app.listen(port, () => {
  console.log(`Frontend gestartet!`);
})
