const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "martin123456",
  database: "grow",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

