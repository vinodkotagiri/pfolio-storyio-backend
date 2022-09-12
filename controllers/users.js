const User = require('../models/user');

//Return all the users in the database
const users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = users;
