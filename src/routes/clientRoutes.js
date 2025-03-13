const router = require('express').Router();
const Client = require('../models/Client/Client');
const jwt = require('jsonwebtoken');
const bycrypt = require('bycryptjs');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, firstname, email, password } = req.body;
    
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    const client = new Client({ name, firstname, email, password });
    await client.save();

    const token = jwt.sign({ clientId: client._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token, ClientId: client._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ clientID: client._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, clientID: client._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;