const mongoose = require('mongoose');
const User = require('../models/user');
const editUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.status(400).json({ error: 'User not found' });
    return;
  }

  await user.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'User Deleted' });
};

module.exports = editUser;
