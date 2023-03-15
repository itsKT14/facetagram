const postRouter = require('express').Router();
const postController = require('../controller/postController');
const jwtAuth = require('../utils/jwtAuth');

//add post
postRouter.post('/add', jwtAuth.verify, postController.post_add);

//get all posts for home
postRouter.post('/home-posts', jwtAuth.verify, postController.home_post);

module.exports = postRouter;