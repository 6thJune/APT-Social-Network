const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.token = null;
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

module.exports = router;