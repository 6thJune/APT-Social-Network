const express = require('express');
const postController = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const path = require('path');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/upload'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });


postController.post('/profile/create-post', upload.single('photo'), async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.session.token;
        const auth = await User.findById(userId);
        const photo = req.file;
        var newPost = new Post();
        if (!photo) {
            newPost = new Post({ userId: auth._id, username: auth.username, content });
            await newPost.save();
            return res.status(201).json({ success: true })
        }
        const photoUrl = photo.path.split("public")[1];
        newPost = new Post({ userId: auth._id, username: auth.username, content, photoUrl: photoUrl });
        await newPost.save();
        return res.status(201).json({ success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

postController.post('/profile/delete-post', async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);
        if (post.photoUrl) {
            const filePath = path.join(__dirname, '../public', post.photoUrl);
            if (fs.existsSync(filePath)) {
                await unlinkAsync(filePath);
            }
        }
        await Post.findByIdAndDelete(postId);
        return res.status(201).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

postController.post('/like-post', async (req, res) => {
    try {
        const { postId } = req.body;
        const token = req.session.token;
        const user = await User.findById(token);
        const post = await Post.findById(postId);
        if (user.postsLiked.includes(post._id) && post.noLike != 0) {
            post.noLike--;
            const inx = user.postsLiked.indexOf(post._id);
            user.postsLiked.splice(inx, 1);
            await post.save();
            await user.save();
            return res.status(201).json({ success: true });
        }
        post.noLike++;
        user.postsLiked.push(post._id);
        await post.save();
        await user.save();
        return res.status(201).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


module.exports = postController;