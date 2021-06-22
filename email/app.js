
const express = require('express')
const ProtonMail = require('protonmail-api');
const app = express()
const port = 3000
const config = require("./config.json")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/sendMessage",(req,res) => {
  const von = req.body.von
  const an = req.body.an
  const inhalt = req.body.inhalt 
  sendmail(an,"User Message",inhalt)
  res.send({
    "Antwort": "Ja alles geklappt glaub ich"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function sendmail(p_to,p_subject,p_body)
{
  const pm = await ProtonMail.connect({
    username: config.username,
    password: config.password
  })

  await pm.sendEmail({
    to: p_to,
    subject: p_subject,
    body: p_body
  })
  pm.close()
}
