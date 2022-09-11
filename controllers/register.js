const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { _id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const { password, ...rest } = user._doc;
    res.status(201).json({ token, user: rest });
  } catch (err) {
    res.status(500).json({ error: 'Server Error!' });
  }
};

module.exports = register;
