//import modules
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const dbConnect = require('./db_config/db_connect');
const cors = require('cors');

const userRouter = require('./routes/userRouter');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

//connect and check db connection
dbConnect();

//routes
app.use('/', userRouter);

//check port connection
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`server is now running in port:${port}`);
});