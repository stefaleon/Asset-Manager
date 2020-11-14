const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

router.post('/', categoriesController.createCategory);

router.get('/', categoriesController.readCategories);

router.get('/:id', categoriesController.readCategory);

module.exports = router;
