const express = require('express');

const {indexView, profileView, tableView,tableReportView,changePassView} = require('../controllers/homeController');
const router = express.Router();

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}

router.get('/',isAuthenticated,tableReportView);
router.get('/',indexView);
router.get('/profile',isAuthenticated, profileView);
router.get('/table-users',isAuthenticated, tableView);
router.get('/change-password',isAuthenticated,changePassView)   

module.exports = {
    routes: router
}