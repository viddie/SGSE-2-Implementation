const express = require('express')
const path = require('path');
const app = express()
const port = 3001

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

// Static content
app.use(express.static(STATIC));

// All GET request handled by INDEX file
app.get('*', function (req, res) {
  res.sendFile(INDEX);
});

// Start server
app.listen(port, function () {
  console.log('Server up and running on ', `http://localhost:${port}/`);
});