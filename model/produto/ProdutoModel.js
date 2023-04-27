const db = require('../../banco/dbConexao');

class ProdutoModel{
  static getAll(callback){
    return db.query("SELECT * FROM produto", callback);
  }

  static getId(id, callback){
    return db.query("SELECT * FROM produto WHERE id_produto = ?", [id], callback);
  }

  static create(data, callback){
    return db.query("INSERT INTO produto (nome, caminho_imagem, preco) VALUES(?, ?, ?)", [data.nome, data.caminho_imagem, data.preco], callback);
  }
}

module.exports = ProdutoModel;