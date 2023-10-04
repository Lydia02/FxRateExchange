const nodemailer = require('nodemailer');
const { oauth2Client } = require('../utils/utilis');
require('dotenv').config();
//const ErrorHandler = require('../middleware/errorHandler');
const AppError = require('../errors/AppError');

// Set up the Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'ojoawolydia@gmail.com',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: 'REFRESH_TOKEN', 
  },
});

// Function to send email notifications
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'xyz@gmail.com',
    to, 
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    throw new AppError('Error sending email', 500); 
  }
};

module.exports = {
  sendEmail,
};
