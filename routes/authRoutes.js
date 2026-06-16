const express = require("express");
const User = require("../models/User");

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

module.exports = router;