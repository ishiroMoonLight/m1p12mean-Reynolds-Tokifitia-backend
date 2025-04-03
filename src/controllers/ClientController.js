const Client = require('../models/Client/Client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const clientController = {
  signup: async (req, res) => {
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

      res.status(201).json({ token, clientId: client._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const client = await Client.findOne({ email });
      if (!client) {
        return res.status(400).json({ message: 'Invalid email' });
      }

      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ clientId: client._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.json({ token, clientId: client._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = clientController;