const express = require('express');
const path = require('path');
const router = express.Router();

// index.css route
router.get('/index.css', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'css', 'index.css'));
});

module.exports = router;