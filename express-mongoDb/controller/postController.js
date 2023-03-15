const User = require('../model/userModel');
const Post = require('../model/postModel');
const checkDate = require('../utils/checkDate');
const {getUsername, getPic} = require('../utils/checkUser');

const post_add = async (req, res) => {
	try {
        const userId = req.getUser.id;
        if(userId) {
            const logUser = await User.findOne({_id: userId});
            const newPost = new Post({
                user_id: userId,
                caption: req.body.caption,
                attachment: req.body.attachment
            });
            await newPost.save();
            res.send({status: "success", message: "New post created", newPost});
        } else {
            res.send({status: "error", message: "No user"});
        }
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
}

const home_post = async (req, res) => {
    try {
        const userId = req.getUser.id;
        if(userId) {
            const rawPosts = await Post.find({user_id: userId});

            const allPosts = [];
            for(let post of rawPosts) {
                const objPost = {
                    id: post._id,
                    user_id: post.user_id,
                    username: await getUsername(post.user_id),
                    pic: await getPic(post.user_id),
                    caption: post.caption,
                    attachment: post.attachment,
                    date: checkDate(post.createdAt)
                }
                allPosts.push(objPost)
            }
            res.send({status: "success", message: "Got all posts for home", allPosts});
        } else {
            res.send({status: "error", message: "No user"});
        }
    } catch (error) {
        res.status(400).send(error);
		console.log(error);
    }
}

module.exports = {
    post_add,
    home_post
}