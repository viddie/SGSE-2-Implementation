const express = require('express')
const path = require('path');
const app = express()
const port = 3001

app.use(express.static(__dirname + '/dist'));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Frontend gestartet!`);
})
