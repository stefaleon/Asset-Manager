const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const adminonly = require('../middleware/adminonly');

router.post('/', adminonly, usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', adminonly, usersController.readUsers);
router.get('/:id', adminonly, usersController.readUser);
router.patch('/:id', adminonly, usersController.updateUser);

module.exports = router;
