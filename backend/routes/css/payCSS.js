const express = require('express');
const path = require('path');
const router = express.Router();

// style.css route
router.get('/pay.css', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'css', 'pay.css'));
});

module.exports = router;