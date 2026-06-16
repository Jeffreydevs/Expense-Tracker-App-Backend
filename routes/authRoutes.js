const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name,email,password } = req.body;
  const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        message : "Email already registered"
      });
    }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password : hashedPassword
  });

  await user.save();
  res.json({
    message: "User registered successfully"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) {
    return res.status(400).json({
      message: "Invalid email or password"
    });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({
      message: "Invalid email or password"
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ 
    message: "Login successful",
    token
  });
});

module.exports = router;