const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  //If user not found database
  if (!user) {
    res.status(404).json({ error: 'User doesnot exist' });
    return;
  }

  //If password is incorrect
  const verifyPassword = await bcrypt.compare(req.body.password, user.password);
  if (!verifyPassword) {
    res.status(400).json({ error: 'Password is incorrect' });
    return;
  }

  //If everything is correctly verified, send auth token
  const token = jwt.sign(
    { _id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.status(200).json({ token: token });
};

module.exports = login;
