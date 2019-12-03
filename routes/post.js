const express = require('express');
const router = express.Router();


const postController = require('../controllers/postController');

const isAuth = require('../middleware/isAuth');


router.post('/', isAuth, postController.addPost);
router.get('/', isAuth, postController.getPosts);


// router.get('/',isAuth, postController)


module.exports = router;