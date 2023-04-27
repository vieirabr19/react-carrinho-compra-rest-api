--db_vendas
CREATE TABLE produto (
  id_produto INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NULL,
  caminho_imagem text NULL,
  preco NUMERIC(7.2) NULL,
  PRIMARY KEY (id_produto)
);