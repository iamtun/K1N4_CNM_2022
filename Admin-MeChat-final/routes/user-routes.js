const express = require('express');

const {removeBlock,getUserById} = require('../controllers/userController');
const router = express.Router();

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}

router.get('/remove-block/:userId',isAuthenticated,removeBlock);
router.get('/user-item/:userId',isAuthenticated,getUserById);

module.exports = {
    routes: router
}