const userRouter = require('express').Router();
const userController = require('../controller/userController');
const jwtAuth = require('../utils/jwtAuth');

//home
userRouter.post('/user/home', jwtAuth.verify, userController.user_home);

// userRouter.get('/profile/:id', userController.user_profile);

//register user
userRouter.post('/user/add', userController.user_add);

//login user
userRouter.post('/user/login', userController.user_login);

module.exports = userRouter;