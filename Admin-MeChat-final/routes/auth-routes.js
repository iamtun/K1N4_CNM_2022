const express = require('express');
const router = express.Router();
const {loginView, logOut,postLogin,postChangePassword}  = require('../controllers/authController');

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}

router.get('/login', loginView);

router.post('/post-login', postLogin);
router.post('/logout',isAuthenticated, logOut);
router.post('/change-password/:userId',isAuthenticated, postChangePassword);

module.exports = {
    routes: router
}