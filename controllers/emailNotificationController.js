const nodemailer = require('nodemailer');
const { oauth2Client } = require('../utils/utilis');
require('dotenv').config();
const { AppError, BadRequestError } = require('../errors'); // Update the path as needed

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
    // Handle specific error types and throw custom errors
    if (error.responseCode === 400) {
      throw new BadRequestError('Bad request when sending email');
    } else if (error.responseCode === 401) {
      throw new UnauthenticatedError('Unauthorized when sending email');
    } else if (error.responseCode === 403) {
      throw new UnauthorisedError('Forbidden when sending email');
    } else if (error.responseCode === 404) {
      throw new NotFoundError('Email recipient not found when sending email');
    } else {
      // Handle other errors as a generic custom error
      throw new AppError('Error sending email', 500);
    }
  }
};

module.exports = {
  sendEmail,
};
