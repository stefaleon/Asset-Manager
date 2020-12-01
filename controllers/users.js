const bcrypt = require('bcryptjs');

const User = require('../models/user');
const validateEmail = require('../utils/validate-email');

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json({ error: 'Please enter a name for the user' });
    }

    if (!req.body.email || !validateEmail(req.body.email.trim())) {
      return res
        .status(400)
        .json({ error: 'Please enter a valid email for the user' });
    }

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    if (!req.body.password || req.body.password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Please enter a six or more charecters long password' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};
