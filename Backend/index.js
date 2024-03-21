const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const gameRoutes = require('./src/routes/gameRoutes');
const authRoutes = require("./src/routes/authRoutes");
const otpRoutes = require("./src/routes/otpRoutes");
const jobRoutes = require('./src/routes/jobRoutes');
const sgMail = require("@sendgrid/mail");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;
const sendgridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridApiKey);
app.use(express.json());
app.use(cors());

mongoose.connect(dbURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use auth routes
app.use("/auth", authRoutes);
app.use("/otp", otpRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', gameRoutes);

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
