const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router();
const connection = require('../../middleware/database.js');

const saltRounds = 10;

// felhasználó regisztrációja
router.post('/reg', function (req, res) {
    const { email, username, password } = req.body;

    connection.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
        if (err) {
            Swal.fire({
         
                text: 'Enter something!',
                icon: 'warning',
                customClass: {
                    container: 'custom-swal-container', // Testreszabott konténer osztály
                    popup: 'custom-swal-popup', // Testreszabott párbeszédpanel osztály
                    title: 'custom-swal-title', // Testreszabott cím osztály
                    htmlContainer: 'custom-swal-html-container', // Testreszabott HTML konténer osztály
                    confirmButton: 'custom-swal-confirm-button', // Testreszabott megerősítő gomb osztály
                    cancelButton: 'custom-swal-cancel-button', // Testreszabott megszakító gomb osztály
                    close: 'custom-swal-close-button', // Testreszabott bezáró gomb osztály
                    icon: 'custom-swal-icon', // Testreszabott ikon osztály
                    image: 'custom-swal-image', // Testreszabott kép osztály
                    input: 'custom-swal-input', // Testreszabott input mező osztály
                    actions: 'custom-swal-actions', // Testreszabott akciók osztály
                    loader: 'custom-swal-loader', // Testreszabott töltő ikon osztály
                    footer: 'custom-swal-footer', // Testreszabott lábléc osztály
                    backdrop: 'custom-swal-backdrop', // Testreszabott háttér osztály
                    showConfirmButton: 'custom-swal-show-confirm-button', // Testreszabott megerősítő gomb megjelenítés osztály
                    showCancelButton: 'custom-swal-show-cancel-button', // Testreszabott megszakító gomb megjelenítés osztály
                  }
                });
        }

        if (result.length > 0) {
            return res.status(400).json("A felhasználónév már foglalt!");
        }

        bcryptjs.hash(password, saltRounds, (err, hash) => {
            if (err) throw err;

            connection.query('INSERT INTO user (userID, email, username, password, role, userImage) VALUES (NULL, ?, ?, ?, 0, "no_image.png")', [email, username, hash], (err, result) => {
                if (err) {
                    res.json("Hiba a regisztráció során!");
                }

                res.json("Sikeres regisztráció!");
            });
        });
    });
});

module.exports = router;