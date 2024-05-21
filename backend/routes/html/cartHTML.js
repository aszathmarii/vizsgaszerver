const express = require('express');
const path = require('path');
const router = express.Router();

// ordering.html route
router.get('/ordering.html', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'html', 'user', 'ordering.html'));
});

module.exports = router;