const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router();
const connection = require('../../middleware/database.js');

// login route
router.post('/login', function (req, res) {
    const { email, password } = req.body;

    connection.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
        if (err) {
            return req.status(500).json("Hiba történt a bejelentkezés során!");
        }

        if (result.length === 0 || !bcryptjs.compareSync(password, result[0].password)) {
            return res.status(401).json("Hibás jelszó vagy felhasználónév!");
        }

        const user = {
            email: result[0].email,
            username: result[0].username,
            role: result[0].role,
            userID: result[0].userID
        }

        res.cookie('userData', JSON.stringify(user), { httpOnly: true, maxAge: 1000 * 60 * 60 * 12 });
        if (user.role === 1) {
            return res.json({ success: true, user, redirect: '/admin.html '});
        } else if (user.role === 0) {
            return res.json({ success: true, user, redirect: '/user.html' });
        }
    });
});

module.exports = router;