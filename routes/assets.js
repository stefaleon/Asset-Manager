const express = require('express');
const router = express.Router();

const assetsController = require('../controllers/assets');

router.post('/', assetsController.createAsset);

module.exports = router;
