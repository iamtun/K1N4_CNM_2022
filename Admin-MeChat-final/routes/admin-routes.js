const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router();

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}
router.post('/update-text/:adminId',isAuthenticated,adminController.updateText);
router.get('/change-avatar',isAuthenticated,adminController.changeAvatar);

module.exports = {
    routes: router
}