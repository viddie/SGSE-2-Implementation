const express = require('express')
const app = express()
const port = 3001

app.use(express.static('app/public'));

app.listen(port, () => {
  console.log(`Frontend gestartet!`);
})
