const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

async function sendMail(to, subject, text, html = null) {
  try {
    await transporter.sendMail({
      from: `"Hotel Admin" <${emailConfig.user}>`,
      to,
      subject,
      text,
      html
    });
    console.log(`📧 Mail envoyé à ${to}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi d'email à ${to}:`, error);
    throw error;
  }
}

module.exports = sendMail;