const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use( cors({
    origin: 'http://localhost:3000',
    credentials: true
  }) );
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Your mail server host
    port: 587, // Your mail server port
    secure: false, // Use TLS
    auth: {
        user: process.env.email, // Your email address
        pass: process.env.password // Your email password
    }
});

// Endpoint to send emails
app.post('/send-email', async (req, res) => {
    const { subject, emailContent, recipientEmail } = req.body;

    const mailOptions = {
        from: process.env.email, 
        to: recipientEmail,
        subject: subject,
        html: emailContent
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});