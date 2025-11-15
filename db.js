const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "db17012005",
    database: "exp9"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

module.exports = connection;
