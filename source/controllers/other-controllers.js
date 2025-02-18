const express = require('express');
const otherController = express.Router();
const User = require('../models/user');

otherController.post('/search', async (req, res) => {
    try {
        const { searchContent } = req.body;
        const users = await User.find({});
        let result = [];
        users.forEach(u => {
            if (searchContent == '' || searchContent.includes(' '))
                return;
            else if (u.username.indexOf(searchContent) != -1) {
                if (!result.includes(u.username))
                    result.push(u.username);
            }
            else
                return;
        });
        return res.status(201).json({ result: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = otherController;