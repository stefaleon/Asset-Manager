const express = require('express');
const router = express.Router();

const assetsController = require('../controllers/assets');

router.post('/', assetsController.createAsset);

router.get('/', assetsController.readAssets);

router.get('/:id', assetsController.readAsset);

router.patch('/:id', assetsController.updateAsset);

router.delete('/:id', assetsController.deleteAsset);

module.exports = router;
