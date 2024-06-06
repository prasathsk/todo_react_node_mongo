const mysql = require('mysql');

const config = {
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "",
    "database": "relationship"
}

const connection = mysql.createConnection(config);
// console.log("connected");

module.exports = {
    connection
}