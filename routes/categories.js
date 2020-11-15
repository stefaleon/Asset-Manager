const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

router.post('/', categoriesController.createCategory);

router.get('/', categoriesController.readCategories);

router.get('/:id', categoriesController.readCategory);

router.patch('/:id', categoriesController.updateCategory);

module.exports = router;
