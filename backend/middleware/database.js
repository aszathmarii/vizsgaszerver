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

    console.log('The server is running!');
});

module.exports = connection;