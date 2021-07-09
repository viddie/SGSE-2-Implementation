
const express = require('express')
const app = express()
const port = 30100
const axios = require('axios');
const db = require("./database/database.js")
const mail = require("./email/email")
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somerandomaccesstoken';

var validUser;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          validUser = user;
          req.validUser = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
}




app.get('/', authenticateJWT, async (req,res) =>
{
})

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
  db.db_Query("SELECT * FROM emails",(err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    })
    res.send(rows);
  })
})

app.post("/sendMessage",async (req,res) => {
  res_users = await axiosi.get("/user/auth")
  res_users = res_users.data
  let von = req.body.von
  let an = req.body.an
  let von_user;
  let an_user;
  for(var i = 0; i < res_users.length; i++) 
  {
    if(res_users[i]._id == von)
    {
      von_user = res_users[i];
    }
    if(res_users[i]._id == an)
    {
      an_user = res_users[i];
    }
  }
  let inhalt = req.body.inhalt 
  let message = `Hallo ${an_user.username},\n
  ${von_user.username} hat ihnen folgende Nachricht geschickt:\n
  ${inhalt}`
  mail.sendmail(an_user.email,`Nachricht von ${von_user.username}(BarterSmarter)`,message,res)
})


app.get("/newOffer", async (req,res) => {
  res.send("email send")
  const accessToken = jwt.sign({ username: "BarterSmarter", role: "admin", id: "60e6ea2080499400127e9ebe", email: "BarterSmarter@web.de" }, accessTokenSecret, { expiresIn: '1h' })
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`}
  };
  res_article = await axiosi.get("/offers/article/" + req.query.id,config)
  res_article = res_article.data
  console.log(res_article)
  res_users = await axiosi.get("/user/auth")
  res_users = res_users.data
  console.log(res_users)
  let correct_user = res_users[0];
  for(var i = 0; i < res_users.length; i++) 
  {
    if(res_users[i]._id == res_article.sellerID)
    {
      correct_user = res_users[i];
    }
  }
  no_string = `Hallo ${correct_user.username} \n
  Ihr Angebot ${res_article.heading} wurde erfolgreich erstellt. \n \n
  Mit freundlichen Grüßen \n
  Ihr Barter Smarter Team`
  mail.sendmail(correct_user.email,"Barter Smarter Angebot erstellt",no_string)
  db.saveItem(correct_user._id,"Barter Smarter",no_string,res_article._id)
})

app.get("/registerConfirmation", async (req,res) => {
  res.send("email send")
  email = req.query.email;
  inhalt = req.query.inhalt;
  confirm_string = `Hallo,\n
  Bitte klicken sie auf den Registrierungslink: ${inhalt} \n \n
  Mit freundlichen Grüßen \n
  Ihr Barter Smarter Team`
  mail.sendmail(email,"Registrierung BarterSmarter",confirm_string)
})

app.get("/confirm", async (req,res) => {
  res.redirect("https://sgse2.ad.fh-bielefeld.de/login")
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
  for(var i = 0; i < res_users.length; i++) 
  {
    if(res_users[i]._id == res_article.sellerID)
    {
      correct_user = res_users[i];
    }
  }
  no_string = `Hallo ${correct_user.username} \n
  Ihr Angebot ${res_article.heading} wurde gekauft. \n \n
  Mit freundlichen Grüßen \n
  Ihr Barter Smarter Team`
  mail.sendmail(correct_user.email,"Barter Smarter Angebot gekauft",no_string)
  db.saveItem(correct_user._id,"Barter Smarter",no_string,res_article._id)

})

app.listen(port, () => {
  console.log(`Email Microservice listening at port ${port}`)
})


