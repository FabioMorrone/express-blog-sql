const mysql = require('mysql2')

const credential = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}

const connection = mysql.createConnection(credential)

connection.connect((err) => {
    if (err) throw err;
    console.log('connected to Mysql');
});

module.exports = connection;