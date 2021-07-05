const express = require('express')
const path = require('path');
const app = express()
const port = 3001

app.use(express.static(__dirname + '/dist'), {index: '_'});

app.listen(port, () => {
  console.log(`Uuuuuuuunnnnnnnnd looooooosgehts ..... Frontend gestartet!`);
})
