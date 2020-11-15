const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');

router.post('/', locationsController.createLocation);

router.get('/', locationsController.readLocations);

router.get('/:id', locationsController.readLocation);

router.patch('/:id', locationsController.updateLocation);

router.delete('/:id', locationsController.deleteLocation);

module.exports = router;
