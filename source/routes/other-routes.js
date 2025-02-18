const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

router.get('/home/:username', async (req, res) => {
    try {
        const token = req.session.token;
        const currentUser = await User.findById(token);
        const username = req.params.username;
        const user = await User.findOne({ username });
        const userId = user._id;
        const posts = await Post.find({ userId });
        res.render('search-result', { user: user, posts: posts, currentUser: currentUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;