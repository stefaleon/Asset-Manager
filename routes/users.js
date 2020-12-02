const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const authorize = require('../middleware/authorize');

router.post('/', authorize, usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', usersController.readUsers);

module.exports = router;
