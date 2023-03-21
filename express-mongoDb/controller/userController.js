const User = require('../model/userModel');
const Follow = require('../model/followModel');
const validation = require('../utils/validation');
const bcrypt = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');

const user_add = async (req, res) => {
	try {
        const { error } =  validation.userValidation.validate(req.body);
        const isEmailExisting = await validation.isEmailExisting(req.body.email);
        const isUsernameExisting = await validation.isUsernameExisting(req.body.username);

        if(isUsernameExisting) return  res.send({status: "error", message: isUsernameExisting});
        if(isEmailExisting) return  res.send({status: "error", message: isEmailExisting});
        if(error) return res.send({status: "error", message: error.details[0].message});
        
        const newUser = new User({
            fname: req.body.fname,
            username: req.body.username,
            email: req.body.email,
            pic: "",
            bio: "",
            gender: "",
            phone: null,
            address: "",
            status: "Offline",
            password: await bcrypt.securePassword(req.body.password)
        });
        await newUser.save();
        res.send({
            status: "success",
            message: "You have successfuly created an account!"
        });
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

        res.send({status: "success", message: "Logged In Successfully", token});
    } catch (error) {
        res.send({status: "error", message: "backend error"});
		console.log(error);
    }
}

const user_home = async (req, res) => {
    try {
        const userId = req.getUser.id;
        if(userId) {
            const logUser = await User.findOne({_id: userId});
            const user = {
                user_id: userId,
                username: logUser.username,
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

const user_profile = async (req, res) => {
    try {
        const userId = req.getUser.id;
        const profileId = req.body.id;
        const isOwner = userId==profileId;
        if(userId) {
            const logUser = await User.findOne({_id: profileId});
            const followRecord = await Follow.findOne({user_followed: profileId, user_follower: userId});
            const btnFollow = (followRecord)?"Following":"Follow";
            const user = {
                fname: logUser.fname,
                username: logUser.username,
                pic: logUser.pic || "../../src/assets/img/user-icon.png",
                bio: logUser.bio,
                isOwner: isOwner
            }
            res.send({status: "success", message: "Hello user", user, btnFollow});
        } else {
            res.send({status: "error", message: "No user"});
        }
    } catch (error) {
        res.send({status: "error", message: "backend error"});
		console.log(error);
    }
}

const user_follow = async (req, res) => {
    try {
        const userId = req.getUser.id;
        const profileId = req.body.id;
        const isFollowing = req.body.isFollowing;
        if(userId) {
            if(isFollowing){
                const newFollow = new Follow({
                    user_followed: profileId,
                    user_follower: userId
                });
                await newFollow.save();
                res.send({status: "success", message: "Profile has been followed successfully"});
            } else {
                const followRecord = await Follow.findOne({user_followed: profileId, user_follower: userId});
                await Follow.findByIdAndDelete(followRecord._id);
                res.send({status: "success", message: "You have unfollowed this user"});
            }
            
        } else {
            res.send({status: "error", message: "No user"});
        }
    } catch (error) {
        res.send({status: "error", message: "backend error"});
		console.log(error);
    }
}

const user_get_follow = async (req, res) => {
    try {
        const userId = req.getUser.id;
        const profileId = req.body.id;
        if(userId) {
            const numFollower = await Follow.countDocuments({user_followed: profileId});
            const numFollowing = await Follow.countDocuments({user_follower: profileId});
            res.send({status: "success", message: "Got all follow details", numFollower, numFollowing});
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
    user_home,
    user_profile,
    user_follow,
    user_get_follow
}