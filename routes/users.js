const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const adminonly = require('../middleware/adminonly');

router.post('/', adminonly, usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', adminonly, usersController.readUsers);

module.exports = router;
