const express = require('express');
const authController = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

authController.post('/register', async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ message: 'Email đã tồn tại!' })
        if (existingUser)
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' })
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, username, password: hashedPassword });
        await user.save();
        return res.status(201).json({ success: true, message: 'Đăng ký thành công! Chuyển đến đăng nhập!' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

authController.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, message: 'Tên đăng nhập không tồn tại!' });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ success: false, message: 'Mật khẩu không đúng!' });
        req.session.token = user._id;
        return res.status(201).json({ success: true })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = authController;