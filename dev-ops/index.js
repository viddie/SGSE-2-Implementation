const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 30100

app.get('/', (req, res) => {
  console.log('Got request for /');
  res.send('Hello World!');
});


app.get('/test', (req, res) => {
  console.log('Got request for /test');
  fetch("http://api.bartersmarter.de/echo").then(res => res.text()).then(text => {
    res.send('Some example fetch -> '+text);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
