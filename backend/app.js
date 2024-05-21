const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const backendRoutes = require('./routes/routes.js');

const fs = require('fs');

const frontendPath = path.join(__dirname, '..', 'frontend');
const imagePath = path.join(__dirname, 'images');

const port = 23009;
const host = 'http://nodejs.dszcbaross.edu.hu';

const mysql = require('mysql');

// adatbázishoz kapcsolódás
const connection = mysql.createConnection({
    host: '192.168.255.103',
    user: 'u116_QaaC6iRoDM',
    password: 'hc@AC3A0005JEdTrSv8aBT!!',
    database: 's116_db'
});

connection.connect((err) => {
    if (err) {
        console.log(`Error connecting to the database: ${err}`);
        return;
    }

    console.log('!');
});

// json parse-hoz (hogy a req.body-ban érkező adatokat fel tudjuk dolgozni)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parse-hoz
app.use(cookieParser());

// backend útvonalak használatához
app.use('/', backendRoutes);

// frontend útvonalak használatához
app.use('/frontend', express.static(frontendPath));

// statikus fájlok kiszolgálása az 'images' mappából
app.use('/images', express.static(imagePath));



app.use(session({
    secret: 'mySecretKey',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    expires: 24 * 60 * 60 * 1000, // 24 hours
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // secure: true csak HTTPS alatt működik
}));




app.get('/cart', (req, res) => {
    fs.readFile('../frontend/html/user/cart.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/cart.js', (req, res) => {
    fs.readFile('../frontend/js/user/cart.js', (err, file) => {
        res.end(file);
    });
})
app.get('/cart.css', (req, res) => {
    fs.readFile('./cart/cart.css', (err, file) => {
        res.end(file);
    });
})



app.get('/get-all-termek', (req, res) => {
    const query = "SELECT * from termekek";
    connection.query(query, (err, ressults) => {
        if (err) {
            console.log(err);
            res.send({message: "Hiba"});
        }
        else{
            res.send(ressults);
        }
    });
});





app.get('/kosar', (req, res) => {
    fs.readFile('./cart/cart.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/cart.js', (req, res) => {
    fs.readFile('./cart/cart.js', (err, file) => {
        res.end(file);
    });
})
app.get('/cart.css', (req, res) => {
    fs.readFile('./cart/cart.css', (err, file) => {
        res.end(file);
    });
})


app.get('/get-product-in-cart', (req, res) => {
    let produactId = [];
    req.session.products.forEach(id => {
        produactId.push(id.id);
    });

    const sql = `SELECT * FROM product WHERE id IN(${produactId.join(',')})`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        }

        console.table(results);
        console.table(req.session.orderingID);
        
        const productsWithQuantity = results.map(product => {
            const productInSession = req.session.products.find(item => item.id === product.productID);
            const quantity = productInSession ? productInSession.quantity : 0;
            return { ...product, quantity };
        });

        res.json(productsWithQuantity);
   
    });
})


app.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;


    if (!req.session.products) {
        req.session.products = [];
    }

    const productIndex = req.session.products.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        req.session.products[productIndex].quantity++;
    } else {
        req.session.products.push({ id: productId, quantity: 1 });
    }

    res.status(200).send('Product ID added to session');

});



app.listen(port, host, () => {
    console.log(` IP: ${host}:${port}`);
});