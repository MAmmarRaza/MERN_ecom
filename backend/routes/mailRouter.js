const express = require('express');
const nodemailer = require('nodemailer');
const Staff = require('../models/modelStaff');
const bcrypt = require("bcryptjs")
const mailRouter = express.Router();


// Configure Nodemailer with your SMTP server details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'ammarqadri280@gmail.com',
    pass: '',
  },
  tls: {
    ciphers: 'TLSv1.2', // Use TLSv1.2 instead of SSLv3
  },
});

// Define your API endpoint to handle contact form submissions
mailRouter.post('/sendEmail', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Define email content
    const mailOptions = {
      from: 'Chain Ecommerce',
      to: 'ammarraza494@gmail.com',
      subject: `${subject}`,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
});


// Define your API endpoint to handle contact form submissions
mailRouter.post('/forgetPassword', async (req, res) => {
  try {
    const {  email } = req.body;
    const url="http://127.0.0.1:3000/resetpage";
    let response=await Staff.findOne({email:email});
    if(response){
      // Define email content
      const mailOptions = {
        from: 'Chain Ecommerce',
        to: `${email}`,
        subject: `Reset Password`,
        html: `
          <p>Email: ${email}</p>
          <p>Message: ${url}?id=${response._id}</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    }else{
      res.status(500).json({ error: 'Enter Email' });
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
});


mailRouter.post('/reset',async (req, res) => {
  console.log(req.body.id);
  console.log(req.body.password);
    try {
          const salt = await bcrypt.genSalt(10);
          const securePass = await bcrypt.hash(req.body.password, salt)
        const id=req.body.id;
          await Staff.findByIdAndUpdate({ _id: id }, { $set: 
            {
            password: securePass
        } 
      });
      console.log(securePass)  
      res.status(200).json("updated");    
    } catch (error) {
        res.status(500).json("not updated");
        console.log(error);
    }
});
module.exports = mailRouter;