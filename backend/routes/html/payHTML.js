const express = require('express');
const path = require('path');
const router = express.Router();

// reg.html route
router.get('/pay.html', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'html', 'user', 'pay.html'));
});

module.exports = router;