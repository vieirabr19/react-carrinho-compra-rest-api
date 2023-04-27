const db = require('../../banco/dbConexao');

class ProdutoModel{
  static getAll(callback){
    return db.query("SELECT * FROM produto", callback);
  }

  static getId(id, callback){
    return db.query("SELECT * FROM produto WHERE id_produto = ?", [id], callback);
  }

  static create(data, callback){
    return db.query("INSERT INTO produto (nome, caminho_imagem, preco) VALUES(?, ?, ?)", 
    [data.nome, data.caminho_imagem, data.preco], callback);
  }

  static update(data, callback){
    if(data.caminho_imagem){
      return db.query("UPDATE produto SET nome = ?, caminho_imagem = ?, preco = ? WHERE id_produto = ?", 
        [data.nome, data.caminho_imagem, data.preco, data.id_produto], callback);
    }else{
      return db.query("UPDATE produto SET nome = ?, preco = ? WHERE id_produto = ?", 
        [data.nome, data.preco, data.id_produto], callback);
    }
  }

  static delete(id, callback){
    return db.query("DELETE from produto WHERE id_produto = ?", 
    [id], callback);
  }
}

module.exports = ProdutoModel;