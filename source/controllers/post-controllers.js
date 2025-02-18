const express = require('express');
const postController = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const { upload, cloudinary } = require('../middleware/multer-cloudinary');

postController.post('/profile/create-post', upload.single('photo'), async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.session.token;
        const auth = await User.findById(userId);
        const photo = req.file;
        let newPost;
        if (!photo) {
            newPost = new Post({ userId: auth._id, username: auth.username, content });
            await newPost.save();
            return res.status(201).json({ success: true });
        }
        const photoUrl = photo.path;
        newPost = new Post({ userId: auth._id, username: auth.username, content, photoUrl });
        await newPost.save();

        return res.status(201).json({ success: true, photoUrl });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

postController.post('/profile/delete-post', async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);
        if (post.photoUrl) {
            // Template photo url: https://res.cloudinary.com/cloud_name/image/upload/v123456/uploads/photo.png
            const parts = post.photoUrl.split('/');
            const photoName = parts[parts.length - 1].split('.')[0];
            const folderName = parts[parts.length - 2];
            const cloudinaryPath = `${folderName}/${photoName}`;
            await cloudinary.uploader.destroy(cloudinaryPath);
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