const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String },
  companyType: { type: String },
  jobTitle: { type: String },
  companySize: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  otp: { type: String },
});

const User = mongoose.model("Company", userSchema);

module.exports = User;
