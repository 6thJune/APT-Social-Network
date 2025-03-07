const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

router.get('/home', async (req, res) => {
    try {
        const token = req.session.token;
        const theme = req.session.theme;
        if (!token)
            return;
        const currentUser = await User.findById(token);
        const allPost = await Post.find({});
        res.render('home', { currentUser: currentUser, posts: allPost, theme: theme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/profile', async (req, res) => {
    try {
        const token = req.session.token;
        const theme = req.session.theme;
        if (!token)
            return;
        const currentUser = await User.findById(token);
        const username = currentUser.username;
        const postOfUser = await Post.find({ username });
        res.render('profile', { currentUser: currentUser, posts: postOfUser, theme: theme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;