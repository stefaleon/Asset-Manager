const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.post('/', async (req, res, next) => {
  try {
    const category = await new Category(req.body).save();
    res.status(200).json({ data: category });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
