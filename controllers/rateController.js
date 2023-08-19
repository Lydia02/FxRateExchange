const nodemailer = require('nodemailer');
const { oauth2Client } = require('../utilis');


// Set up the Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'ojoawolydia@gmail.com',
    clientId: '454273591030-8aja7abvbsg0agb4d3vut03qenq0g7o5.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZGZlOTFlYmYwNDU4YTUwZWU2NmI5OCIsImVtYWlsIjoidXNlcjRAZ21haWwuY29tIn0sImlhdCI6MTY5MjQwNDUxMSwiZXhwIjoxNjkyNDA4MTExfQ.RWSNhmYOChdsmHJdzWBd3xWEd61KVQwIR-5x0nx3rgw', // Generate this after authorization
  },
});

// Function to send email notifications
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'ojoawolydia@gmail.com',
    to: 'lydiaojoawo11@gmail.com',
    subject: 'Congratulation Lydia!',
    text: "This is your Job offer"
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
