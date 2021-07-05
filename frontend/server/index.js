const express = require('express')
const app = express()
const port = 3001

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/App.js', function(req, res){
  res.sendFile(__dirname+'/public/App.js');
}); 

app.listen(port, () => {
  console.log(`Frontend gestartet!`);
})
