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

otherController.get('/get-theme', (req, res) => {
    try {
        return res.status(201).json({ theme: req.session.theme });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

otherController.post('/change-theme', (req, res) => {
    try {
        const { themeStatus } = req.body;
        if (themeStatus)
            req.session.theme = 0;
        else
            req.session.theme = 1;
        return res.status(201).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = otherController;