const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const isAuth = require('../middleware/isAuth');


router.post('/', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/', isAuth, authController.getUsers)

router.put('/', isAuth, userController.followUser);


module.exports = router;

