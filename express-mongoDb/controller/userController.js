const User = require('../model/userModel');
const validation = require('../utils/validation');
const bcrypt = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');

const user_add = async (req, res) => {
	try {
        const { error } =  validation.userValidation.validate(req.body);
        const isExisting = await validation.isExisting(req.body.email);
        if(error) {
            const errorMessage = error.details[0].message;
            return  res.send({status: "error", message: errorMessage});
        } else if(isExisting) {
            return  res.send({status: "error", message: isExisting});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                pic: "",
                gender: "",
                phone: null,
                address: "",
                Status: "Offline",
                password: await bcrypt.securePassword(req.body.password)
            });
            await newUser.save();
            res.send({
                status: "success",
                message: "You have successfuly created an account!"
            });
        }
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
}

const user_login = async (req, res) => {
    try {
        const { error } = validation.loginValidation.validate(req.body);
        if(error) {
            const errorMessage = error.details[0].message;
            return res.send({status: "error", message: errorMessage});
        }
        const logUser = await User.findOne({email: req.body.email});
        if(!logUser) return res.send({status: "error", message: "The email you've entered is not connected to an account."});

        const isValid = await bcrypt.comparePassword(req.body.password, logUser.password);
        if(!isValid) return res.send({status: "error", message: "The password you've entered is incorrect."});

        // const defaultPic = "/img/user-icon.png";
        // const getPic = logUser.pic || "";
        const token = jwt.sign({
            id: logUser.id,
            email: logUser.email
            }, process.env.TOKEN_SECRET, {expiresIn: "2h"});

        // res.cookie('token', token, { maxAge: 900000, httpOnly: true });

        res.send({status: "success", message: "Logged In Successfully", token});
    } catch (error) {
        res.send({status: "error", message: "backend error"});
		console.log(error);
    }
}

const user_home = async (req, res) => {
    try {
        const userName = req.getUser.id;
        if(userName) {
            const logUser = await User.findOne({_id: userName});
            const user = {
                name: logUser.name,
                pic: logUser.pic || "../../src/assets/img/user-icon.png"
            }
            res.send({status: "success", message: "Hello user", user});
        } else {
            res.send({status: "error", message: "No user"});
        }
    } catch (error) {
        res.send({status: "error", message: "backend error"});
		console.log(error);
    }
}

module.exports = {
    user_add,
    user_login,
    user_home
}