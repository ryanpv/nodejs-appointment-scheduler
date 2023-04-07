import nodemailer from 'nodemailer';

export const emailResponse = async (req, res, emailType) => {
  try {
    console.log('EMAIL: ', req.body.client);
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'cecil.lueilwitz@ethereal.email',
        pass: '95JGtWJTuMvvshyaC7'
      },
    });
    
    const msg = {
      from: "test guy",
      to: req.body.client,
      // to: req.body.client ? req.body.client : emailRecipient,
      subject: `Appointment ${ emailType.toUpperCase() } confirmed!`,
      text: `Appointment ${ emailType.toUpperCase() } for ${ req.body.time } on ${ req.body.date }`,
    };
  
    const info = await transporter.sendMail(msg);
  
    if (info.rejected.length > 0) { // Statement checks if email was rejected. Response is an array with the email.
      res.send({ message: "Email request has been rejected" })
    } else {
      console.log("message ID", info.messageId);
      res.send('email sent!')
    };

  } catch (err) {
    console.log(err);
    res.send({ message: 'email handler error' })
  };
};