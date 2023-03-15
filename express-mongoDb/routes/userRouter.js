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
userRouter.post('/home', jwtAuth.verify, userController.user_profile);

//logout
// userRouter.get('/logout', (req, res)=>{
//     res.clearCookie('token');
//     res.redirect('login');
// });

module.exports = userRouter;