const userRouter = require('express').Router();
const userController = require('../controller/userController');
const jwtAuth = require('../utils/jwtAuth');

// userRouter.get('/profile/:id', userController.user_profile);

//register user
userRouter.post('/add', userController.user_add);

//login user
userRouter.post('/login', userController.user_login);

//home
userRouter.post('/home', jwtAuth.verify, userController.user_home);

//profile info
userRouter.post('/profile', jwtAuth.verify, userController.user_profile);

//follow user
userRouter.post('/follow', jwtAuth.verify, userController.user_follow);

//get follower and following
userRouter.post('/get-follows', jwtAuth.verify, userController.user_get_follow);

module.exports = userRouter;