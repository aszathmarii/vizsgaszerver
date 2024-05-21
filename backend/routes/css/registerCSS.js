const express = require('express');
const path = require('path');
const router = express.Router();

// register.css route
router.get('/register.css', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'css', 'register.css'));
});

module.exports = router;