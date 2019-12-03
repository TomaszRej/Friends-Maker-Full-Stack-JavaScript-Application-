const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');


const isAuth = require('../middleware/isAuth');


router.get('/', isAuth ,chatController.connect);



module.exports = router;