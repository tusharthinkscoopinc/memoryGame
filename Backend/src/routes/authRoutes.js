const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const sgMail = require("@sendgrid/mail");
const path = require('path');
const fs = require('fs');

const emailTemplate = fs.readFileSync(path.join(__dirname, 'verify-email.html'), 'utf8');

const random4DigitOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      country,
      companyType,
      jobTitle,
      companySize,
    } = req.body;

    // Check if the email already exists
    const existingUser = await Company.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newCompany = new Company({
      email,
      firstName,
      lastName,
      password,
      country,
      companyType,
      jobTitle,
      companySize,
    });

    const otp = random4DigitOTP();

    const emailBody = emailTemplate.replace('{{otp}}', otp).replace(/{{name}}/g, firstName);

    const msg = {
      to: email,
      from: "mayursainiofficial@gmail.com",
      subject: "Verification Code",
      html: emailBody,
    };

    console.log(msg);

    await sgMail.send(msg);

    newCompany.isEmailVerified = false;
    newCompany.otp = otp;
    await newCompany.save();
    res.status(201).json({ user: newCompany, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Company.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({ user: user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getUserData", async (req, res) => {
  try {
    const companyData = await Company.findOne({ _id: req.userId });
    res.json(companyData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
