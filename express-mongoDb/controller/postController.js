const User = require('../model/userModel');
const Post = require('../model/postModel');
const Follow = require('../model/followModel');
const Like = require('../model/likeModel');
const checkDate = require('../utils/checkDate');
const {getUsername, getPic} = require('../utils/checkUser');
const { getLikeRecord, getNumLikes } = require('../utils/checkLike');

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
            
            const followedUsers = await Follow.find({user_follower: userId});
            const followedUsersIds = [];
            for(let user of followedUsers){
                followedUsersIds.push(user.user_followed);
            }
            followedUsersIds.push(userId);
            const rawPosts = await Post.find({user_id: { $in: followedUsersIds } }).sort({createdAt: -1});
            const likeRecord = await Like.findOne({});

            const allPosts = [];
            for(let post of rawPosts) {
                const objPost = {
                    id: post._id,
                    user_id: post.user_id,
                    username: await getUsername(post.user_id),
                    pic: await getPic(post.user_id),
                    caption: post.caption,
                    attachment: post.attachment,
                    date: checkDate(post.createdAt),
                    owner: (post.user_id==userId),
                    isLiked: await getLikeRecord(post._id.toString(), userId),
                    numLikes: await getNumLikes(post._id.toString())
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

const profile_post = async (req, res) => {
    try {
        const userId = req.getUser.id;
        const profileId = req.body.id;
        if(userId) {
            const rawPosts = await Post.find({user_id: profileId});
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
            const total = await Post.countDocuments({user_id: profileId});
            res.send({status: "success", message: "Got all posts for home", allPosts, total});
        } else {
            res.send({status: "error", message: "No user"});
        }
    } catch (error) {
        res.status(400).send(error);
		console.log(error);
    }
}

const post_like = async (req, res) => {
    try {
        const userId = req.getUser.id;
        const postId = req.body.post_id;
        const isLiked = req.body.isLiked;
        if(userId) {
            if(isLiked) {
                const postDetails = await Post.findById(postId);
                const newLike = new Like({
                    post_id: postId,
                    user_posted: postDetails.user_id,
                    user_liked: userId
                });
                await newLike.save();
                res.send({status: "success", message: "Post has been liked"});
            } else {
                await Like.deleteOne({post_id: postId, user_liked: userId});
                res.send({status: "success", message: "Post has been unliked"});
            }
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
    home_post,
    profile_post,
    post_like
}