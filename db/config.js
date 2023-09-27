const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'product_management'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = db;