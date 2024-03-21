const express = require('express');
const router = express.Router();
const User = require('../models/Company');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

const random4DigitOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Read the HTML template
const emailTemplatePath = path.join(__dirname, 'verify-email.html');
const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

// Route for resending OTP
router.post('/resend-otp', async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a new OTP
        const newOTP = random4DigitOTP();

        // Replace the placeholders in the email template with the new OTP and user's first name
        const emailBody = emailTemplate.replace('{{otp}}', newOTP).replace(/{{name}}/g, user.firstName);

        // Send the new OTP through SendGrid
        const msg = {   
            to: user.email,
            from: 'mayursainiofficial@gmail.com',
            subject: 'New Verification Code',
            html: emailBody,
        };

        console.log(msg);
        await sgMail.send(msg);
        user.otp = newOTP;
        await user.save();

        return res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for OTP verification
router.post('/verify-otp', async (req, res) => {
    try {
        const { userId, otp } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the provided OTP matches the saved OTP
        if (user.otp === otp) {
            // Update isEmailVerified to true
            user.isEmailVerified = true;
            // Clear the OTP
            user.otp = null;
            await user.save();

            return res.json({ success: true });
        } else {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
