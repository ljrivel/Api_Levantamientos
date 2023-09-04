const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 2525,
    service: 'gmail',
    auth: {
      user: 'LevantamientosITCR@gmail.com',
      pass: 'wbmzqfivkyvzcxak',
    },
  });
};

const sendEmail = (email, subject, text) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: 'LevantamientosITCR@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar correo');
    } else {
      console.log('Correo enviado correctamente');
    }
  });
};

exports.sendEmail = (email, subject, text) => sendEmail(email, subject, text);
