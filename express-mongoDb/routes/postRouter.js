const postRouter = require('express').Router();
const postController = require('../controller/postController');
const jwtAuth = require('../utils/jwtAuth');

//add post
postRouter.post('/add', jwtAuth.verify, postController.post_add);

//get all posts for home
postRouter.post('/home-posts', jwtAuth.verify, postController.home_post);

//get all posts for home
postRouter.post('/profile-posts', jwtAuth.verify, postController.profile_post);

//like or unlike post
postRouter.post('/like', jwtAuth.verify, postController.post_like);

module.exports = postRouter;