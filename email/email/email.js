const nodemailer = require("nodemailer")

module.exports = {
  sendmail: sendmail,
  email_response: email_response,
  getResponse: getResponse
};

var email_response;

//SMTP Information
transporter = nodemailer.createTransport({
  host: "smtp.web.de",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME, //username stored in environmental variable
    pass: process.env.EMAIL_PASSWORD // password stored in environmental variable
  }
});

//send an email to a specific email adress
async function sendmail(p_to, p_subject, p_body, p_res) {
  //construct mail
  var mailOptions = {
    from: "BarterSmarter@web.de",
    to: p_to,
    subject: p_subject,
    text: p_body
  };
  //send mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      if (p_res) {
        p_res.send(error);
      }
    } else {
      email_response = info;
      console.log('Email sent: ' + info.response);
      if (p_res) {
        p_res.send(info.response);
      }
    }
  });
}

//return email response
function getResponse() {
  return email_response;
}