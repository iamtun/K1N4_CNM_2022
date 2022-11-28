const express = require('express');

const {deleteReport,acceptReport,reportItem} = require('../controllers/reportController');

const router = express.Router();
function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}
router.get('/delete/:reportId',isAuthenticated,deleteReport);
router.get('/accept/:reportId',isAuthenticated,acceptReport);
router.get('/report-item/:reportId',isAuthenticated,reportItem);

module.exports = {
    routes: router
}