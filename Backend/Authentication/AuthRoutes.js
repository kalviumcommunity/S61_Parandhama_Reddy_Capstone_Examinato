const express = require('express');
const router = express.Router();
const User = require('../Model/userSchema');
const bcrypt = require('bcryptjs');

router.post('/signin', async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      fullname,
      email,
      password,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(`Error during sign-up: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(`Error during login: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
