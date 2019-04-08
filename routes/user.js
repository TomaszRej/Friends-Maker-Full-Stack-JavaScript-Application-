const express = require('express');

//const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const testController = require('../controllers/test');
//const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get('/getUsers', userController.getUsers );

router.post('/add-user', userController.addUser);
router.post('/test',testController.test);
// router.post('/postUser', userController.postUser);
router.get('/x', userController.test);

module.exports = router;
