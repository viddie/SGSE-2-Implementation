const express = require('express')
const app = express()
const port = 3001

app.get('/', function(req, res){
  res.sendFile('public/index.html');
});

app.get('/App.js', function(req, res){
  res.sendFile('public/App.js');
}); 

app.listen(port, () => {
  console.log(`Frontend gestartet!`);
})
