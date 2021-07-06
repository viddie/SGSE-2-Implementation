const nodemailer = require("nodemailer")

transporter = nodemailer.createTransport({
    host: "smtp.web.de",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

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