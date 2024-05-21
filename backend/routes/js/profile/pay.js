const express = require('express');
const path = require('path');
const router = express.Router();

// user.js route
router.get('/pay.js', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'frontend', 'js', 'user', 'pay.js'));
});

module.exports = router;