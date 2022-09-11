const User = require('../models/user');

const users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = users;
