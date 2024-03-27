  // app/utils/sendEmail.js

  import nodemailer from 'nodemailer';
  import { logInfo } from './logger'; // Assuming logger is under app/utils/logger.js
  
  let transporter = null;
  
  export async function sendEmail(mailOptions) {
    try {
      if (transporter === null) {
        // Configure nodemailer transporter using Remix.js config
        transporter = nodemailer.createTransport({
          host: process.env.HOST, // Set environment variables or use your config method
          port: process.env.PORT,
          secure: process.env.SECURE, // use SSL
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
        });
      }
  
      // Send email using the transporter
      let response = await transporter.sendMail(mailOptions);
      return response;
    } catch (error) {
      logInfo(error, 'Error occurred while sending email');
    }
  }