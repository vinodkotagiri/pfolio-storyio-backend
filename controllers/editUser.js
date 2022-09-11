const mongoose = require('mongoose');
const User = require('../models/user');
const editUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.status(400).json({ error: 'User not found' });
    return;
  }

  await user.updateOne({ name: req.body.name, email: req.body.email });
  res.status(201).json({ message: 'User Updated' });
};

module.exports = editUser;
