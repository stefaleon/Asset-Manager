const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  try {
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
