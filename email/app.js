
const express = require('express')
const app = express()
const port = 30100
const axios = require('axios');
const db = require("./database/database.js")
const mail = require("./email/email")


const axiosi = axios.create({
  baseURL: 'http://sgse2.ad.fh-bielefeld.de/api/',
  timeout: 1000,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sqlite', (req, res) => {
  res.send()
})

app.post("/sendMessage",(req,res) => {
  const von = req.body.von
  const an = req.body.an
  const inhalt = req.body.inhalt 
  sendmail(an,"Bestellbestätigung Barter Smarter",inhalt,res)
})


app.get("/newOffer", async (req,res) => {
  res.send("email send")
  res_article = await axiosi.get("/offers/article/" + req.query.id)
  res_article = res_article.data
  console.log(res_article)
  res_users = await axiosi.get("/user/auth")
  res_users = res_users.data
  console.log(res_users)
  let correct_user = res_users[0];
  for(user in res_users)
  {
    if(user._id == res_article.sellerID)
    {
      correct_user = user;
    }
  }
  mail.sendmail(correct_user.email,"Barter Smarter Angebot erstellt",correct_user.username)
})

app.get("/confirmOffer",async (req,res) => {
  res.send("email send")
  res_article = await axiosi.get("/offers/article/" + req.query.id)
  res_article = res_article.data
  console.log(res_article)
  res_users = await axiosi.get("/user/auth")
  res_users = res_users.data
  console.log(res_users)
  let correct_user = res_users[0];
  for(user in res_users)
  {
    if(user._id == res_article.sellerID)
    {
      correct_user = user;
    }
  }
  mail.sendmail(correct_user.email,"Barter Smarter Angebot wurde gekauft",correct_user.username)

})

app.listen(port, () => {
  console.log(`Email Microservice listening at http://localhost:${port}`)
})


