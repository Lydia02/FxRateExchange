const nodemailer = require('nodemailer');
const { oauth2Client } = require('../utils/utilis');
require('dotenv').config();

// Set up the Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'ojoawolydia@gmail.com',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
//<<<<<<< HEAD:controllers/emailNotificationController.js
    refreshToken: 'REFRESH_TOKEN'
//=======
    //refreshToken: '', // Generate this after authorization
//>>>>>>> main:controllers/rateController.js
  },
});

// Function to send email notifications
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'xyz@gmail.com',
    to: 'xyw@gmail.com',
    subject: 'Rate Notification!',
    text: "The new rate"
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail,
};
