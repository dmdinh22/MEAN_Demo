const express = require('express');
const router = express.Router();

// register
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});

// auth
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

// valiate
router.get('/valiate', (req, res, next) => {
    res.send('VALIDATE');
});

// export the router
module.exports = router;