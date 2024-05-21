const express = require('express');
const connection = require('../../middleware/database.js');
const upload = require('../../middleware/upload.js');
const router = express.Router();

// termékek lekérdezése route
router.get('/product', function (req, res) {
    connection.query('SELECT product.productID, product.name, product.sizeID, size.size, product.colorID, colors.color, product.cathegoryID, cathegory.cathegory, product.price, product.stock, product.img FROM product JOIN size USING(sizeID) JOIN colors USING(colorID) JOIN cathegory USING(cathegoryID);', (err, results) => {
        res.json(results);
    });
});

// egy konkrét termék lekérdezése id alapján route
router.get('/product/:id', function (req, res) {
    const id = req.params.id;

    connection.query('SELECT product.productID, product.name, product.sizeID, size.size, product.colorID, colors.color, product.cathegoryID, cathegory.cathegory, product.price, product.stock, product.img FROM product JOIN size USING(sizeID) JOIN colors USING(colorID) JOIN cathegory USING(cathegoryID) WHERE product.productID=?', [id], (err, results) => {
        res.json(results);
    });
});

// új termék hozzáadása route
router.post('/product', upload.single('image'), function (req, res) {
    const { name, size, color, cathegory, price, stock } = req.body; // destruktálás = szétbontás
    const imageName = req.file ? req.file.filename : 'no_image.png';

    selectSizeID(size, (err, sizeID) => {
        selectColorID(color, (err, colorID) => {
            selectCathegoryID(cathegory, (err, cathegoryID) => {
                connection.query('INSERT INTO product(productID, name, sizeID, colorID, cathegoryID, price, stock, img) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)', [name, sizeID, colorID, cathegoryID, price, stock, imageName], (err, result) => {
                    res.json("Sikeres felvétel!");
                });
            });
        });
    });
});

// a sizeID lekérdezése
function selectSizeID(size, callback) {
    connection.query('SELECT sizeID FROM size WHERE size = ?', [size], (err, result) => {
        callback(null, result[0].sizeID);
    });
}

// a colorID lekérdezése
function selectColorID(color, callback) {
    connection.query('SELECT colorID FROM colors WHERE color = ?', [color], (err, result) => {
        callback(null, result[0].colorID);
    });
}

// a cathegoryID lekérdezése
function selectCathegoryID(cathegory, callback) {
    connection.query('SELECT cathegoryID FROM cathegory WHERE cathegory = ?', [cathegory], (err, result) => {
        callback(null, result[0].cathegoryID);
    });
}

// termék törlése route
router.delete('/product/:id', function (req, res) {
    const id = req.params.id;

    connection.query('DELETE FROM product WHERE productID=?', [id], (err, result) => {
        res.json("Sikeres törlés!");
    });
});

// termék szerkesztése route
router.put('/product/:id', upload.single('image'), function (req, res) {
    const id = req.params.id;
    const { name, size, color, cathegory, price, stock } = req.body;
    const imageName = req.file ? req.file.filename : 'no_image.png';

    selectSizeID(size, (err, sizeID) => {
        selectColorID(color, (err, colorID) => {
            selectCathegoryID(cathegory, (err, cathegoryID) => {
                connection.query('UPDATE product SET name = ?, sizeID = ?, colorID = ?, cathegoryID = ?, price = ?, stock = ?, img = ? WHERE product.productID = ?;', [name, sizeID, colorID, cathegoryID, price, stock, imageName, id], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    res.json("Sikeres módosítás!");
                });
            });
        });
    });
});

// termék közti keresés
router.post('/searching', function (req, res) {
    const { searching, searchingType } = req.body;
    console.log(searching, searchingType);

    if (searchingType === 'Name') {
        connection.query('SELECT * FROM product WHERE name LIKE CONCAT("%", ?, "%")', [searching], (err, result) => {
            res.json(result);
        });
    } else if (searchingType === 'Size') {
        selectSizeID(searching, (err, sizeID) => {
            connection.query('SELECT * FROM product WHERE sizeID = ?', [sizeID], (err, result) => {
                res.json(result);
            });
        });
    } else if (searchingType === 'Color') {
        selectColorID(searching, (err, colorID) => {
            connection.query('SELECT * FROM product WHERE colorID = ?', [colorID], (err, result) => {
                res.json(result);
            });
        });
    } else if (searchingType === 'Cathegory') {
        selectCathegoryID(searching, (err, cathegoryID) => {
            connection.query('SELECT * FROM product WHERE cathegoryID = ?', [cathegoryID], (err, result) => {
                res.json(result);
            });
        });
    } else if (searchingType === 'Price') {
        connection.query('SELECT * FROM product WHERE price LIKE CONCAT("%", ?, "%")', [searching], (err, result) => {
            res.json(result);
        });
    } else if (searchingType === 'Stock') {
        connection.query('SELECT * FROM product WHERE stock LIKE CONCAT("%", ?, "%")', [searching], (err, result) => {
            res.json(result);
        });
    }
});

// egy termék kosárba helyezése
router.post('/cartSession/:userID/:productID', function(req, res) {
    const userID = req.params.userID;
    const productID = req.params.productID;
    const { stock, price } = req.body;
    const allPrice = stock * price;
    console.log(userID, productID, stock, price, allPrice);
    connection.query('INSERT INTO cartsession (userID, productID, currentStock, allPrice) VALUES (?, ?, ?, ?);', [userID, productID, stock, allPrice], (err, result) => {
        if (err) {
            return res.status(500).json('Internal server error!');
        }

        return res.status(200).json({ success: true });
    })
});

// a kosár tartalmának lekérdezése
router.get('/cartSession', function(req, res) {
    connection.query('SELECT * FROM cartsession JOIN product USING(productID) JOIN size USING(sizeID) JOIN colors USING(colorID) JOIN cathegory USING(cathegoryID)', (err, result) => {
        if (err) {
            return res.status(500).json('Internal server error!');
        }

        return res.status(200).json(result);
    })
});

// aktuális időbélyeg meghatározása
const getCurrentTimestamp = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// a rendelés elküldése
// az ordering táblába beszúrás
router.post('/ordering/:userID', function(req, res) {
    const userID = req.params.userID;
    const { productID, stock, price } = req.body;
    const orderDate = getCurrentTimestamp();

    connection.query('INSERT INTO ordering (orderingID, userID, price, orderDate) VALUES (NULL, ?, ?, ?);', [userID, price, orderDate], (err, result) => {
        if (err) {
            return res.status(500).json('Internal server error!');
        }
    });
});

// a cart táblába beszúrás
router.post('/cart', function(req, res) {
    const { userID, productID, stock, price } = req.body;

    connection.query('SELECT orderingID FROM WHERE userID = ? ordering ORDER BY orderData DESC', [userID],  (err, result) => {
        if (err) {
            return res.status(500).json('Internal server error!');
        }

        if (result.length > 0) {
            const orderingID = result[0].orderingID;

            connection.query('INSERT INTO cart (orderingID, userID, productID, stock, price) VALUES (?, ?, ?, ?, ?);', [orderingID, userID, productID, stock, price], (err, result2) => {
                if (err) {
                    return res.status(500).json('Internal server error!');
                }
//a kosárban benne maradnak a termékek
                if (result2 > 0) {
                    connection.query('TRUNCATE cartsession', (err, result3) => {
                        if (err) {
                            return res.status(500).json('Internal server error!');
                        }

                        return res.status(200).json({ success: true });
                    });
                }
            });   
        }
    }); 
});

module.exports = router;