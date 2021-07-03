
const express = require('express')
const nodemailer = require("nodemailer")
const app = express()
const port = 3000
const webconfig = require("./webconfig.json")
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

function create_db()
{
  db.all(create_query,[],insert_data_db)
}

function insert_data_db()
{
  db.all(insert_query,[],test_db)
}

function test_db()
{
  db.all(test_query,[],(err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function db_Query(sql_query,callback)
{
  db.all(sql_query, [], callback)
}

create_query = `CREATE TABLE IF NOT EXISTS emails (
  email_id INTEGER PRIMARY KEY AUTOINCREMENT,
  an INTEGER NOT NULL,
  von INTEGER NULL,
  inhalt text NULL,
  zeitstempel TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  angebot_id INTEGER NULL)`

insert_query = `INSERT INTO emails(an,von,inhalt,angebot_id)
  VALUES(2,1,"Hilfe ich suche meine Bananen",6)`

test_query = `SELECT * FROM emails`

//dbQuery(create_query);
//dbQuery(insert_query);
//dbQuery(test_query);
create_db()

transporter = nodemailer.createTransport({
  host: "smtp.web.de",
  port: 587,
  secure: false,
  auth: {
    user: webconfig.username,
    pass: webconfig.password
  }
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function sendmail(p_to,p_subject,p_body,p_res)
{
  var mailOptions = {
    from: "BarterSmarter@web.de",
    to: p_to,
    subject: p_subject,
    text: p_body
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      p_res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      p_res.send(info.response);
    }
  }); 
}

async function getUser(id)
{
  axios.get("/user/",{
    params: {
      ID: id
    }
  })
  .then(function(response){
  })
  .catch(function(error){
    console.log(error)
  })
}


async function checkAngebote()
{
  axios.get("/articles").then(function(response){
    for (angebot in response)
    {
      angebotid = angebot.articleID;
      db_Query("SELECT * from emails WHERE angebot_id = " + angebotid,function(err,rows,angebot){
      empty = true;
      for(row in rows)
      {
        empty = false
      }
      if(empty == false)
      {
        userid = angebot.sellerID;
        axios.get("/user/",{
          params: {
            ID: userid
          }
        })
        .then(function(response,angebot){
            emailadress = response.Email;

        })
        .catch(function(error){
          console.log(error)
        })
      }
      });
    }
  })
  .catch(function(error){
    console.log(error)
  })
}

async function test()
{
  console.log("Ich werde aufgerufen")
}

setInterval(test,10000);