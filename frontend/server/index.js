const express = require('express')
const app = express()
const port = 3001

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/App.js', function(req, res){
  res.sendFile(__dirname+'/App.js');
}); 

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
})

app.listen(port, () => {
  console.log(`Frontend gestartet!`);
})
