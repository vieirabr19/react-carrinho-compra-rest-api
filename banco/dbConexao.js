const mysql = require('mysql');

let conexao = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_vendas'
});

module.exports = conexao;