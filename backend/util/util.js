const nodemailer = require("nodemailer");
//const hbs = require('nodemailer-express-handlebars');

class Util {
  constructor() {}

  //Send an email alert to change password request
  async sendPasswordResetMail(userEmail, resetPwd) {
    //let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "nezuswear@gmail.com", // generated ethereal user
        pass: "nz971101#", // generated ethereal password
      },
    });

    //Send email with the message
    let info = await transporter.sendMail({
      from: '"UK Engineering Service" <nezuswear@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: "Reset Password", // Subject line
      text:
        "Please Enter Bellow Code as Your new password to reset your account password", // plain text body
      html: `<h3 style="text-align: center">Please enter this *** ${resetPwd} *** as your password, to login to your account</h3>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

var UtilObj = new Util();
module.exports = UtilObj;
