var mysql = require('mysql');

var connMySQL = function () {
  return mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'portal_noticias',
  });
};

module.exports = function () {
  return connMySQL;
};
