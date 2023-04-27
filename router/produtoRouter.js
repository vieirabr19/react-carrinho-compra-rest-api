const express = require("express");
const router = express.Router();

const produtoModel = require("../model/produto/ProdutoModel");
const respostaClass = require("../model/RespostaClass");

const fs = require("fs");
const pastaPublica = "./public/arquivos/";

router.get('/', function (req, res, next) {
  produtoModel.getAll(function (erro, retorno){
    let resposta = new respostaClass();

    if(erro){
      resposta.erro = true;
      resposta.msg = 'Não foi possível recuperar os dados, consulte o administrador do sistema!';
      console.log('Erro', erro);
    }else{
      resposta.dados = retorno;
    }

    res.json(resposta);
  });
});

router.get('/:id?', function(req, res, next) {
  produtoModel.getId(req.params.id, function(erro, retorno){
    let resposta = new respostaClass();

    if(erro){
      resposta.erro = true;
      resposta.msg = 'Não foi possível recuperar os dados, consulte o administrador do sistema!';
      console.log('Erro', erro);
    }else{
      resposta.dados = retorno;
    }

    res.json(resposta);
  });
});

router.post('/?', function(req, res, next) {
  let resposta = new respostaClass();

  //verifica se recebeu uma imagem
  if(req.body.dados_imagem != null){
    //salvar imagem
    let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');
    let dataAtual = new Date();
    dataAtual = dataAtual.toLocaleString().replace(/\//g, '').replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');
    let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;
    fs.writeFileSync(nomeImagemCaminho, bitmap);
    req.body.caminho_imagem = nomeImagemCaminho;

    produtoModel.create(req.body, function(erro, retorno){
      if(erro){
        resposta.erro = true;
        resposta.msg = 'Não foi possível cadastrar os dados, consulte o administrador do sistema!';
        console.log('Erro', erro);
      }else{
        if(retorno.affectedRows){
          resposta.msg = 'Produto cadastrado com sucesso!';
        }else{
          resposta.erro = true;
          resposta.msg = 'Não foi possível realizar a operação!';
          console.log('Erro', resposta.msg);
        }

        resposta.dados = retorno;
      }
  
      res.json(resposta);
    });
  }else{
    resposta.erro = true;
    resposta.msg = 'Não foi enviado uma imagem!';
    console.log('Erro', resposta.msg);
    res.json(resposta);
  }
});

router.put('/?', function(req, res, next) {
  let resposta = new respostaClass();

  //verifica se recebeu uma imagem
  if(req.body.dados_imagem != null){
    //salvar imagem
    let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');
    let dataAtual = new Date();
    dataAtual = dataAtual.toLocaleString().replace(/\//g, '').replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');
    let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;
    fs.writeFileSync(nomeImagemCaminho, bitmap);
    req.body.caminho_imagem = nomeImagemCaminho;
  }

  produtoModel.update(req.body, function(erro, retorno){
    if(erro){
      resposta.erro = true;
      resposta.msg = 'Não foi possível alterar os dados, consulte o administrador do sistema!';
      console.log('Erro', erro);
    }else{
      if(retorno.affectedRows){
        resposta.msg = 'Produto alterado com sucesso!';
      }else{
        resposta.erro = true;
        resposta.msg = 'Não foi alterar o produto!';
        console.log('Erro', erro);
      }
    }
    // resposta.dados = retorno;

    res.json(resposta);
  });
});

router.delete('/:id?', function(req, res, next) {
  let resposta = new respostaClass();

  produtoModel.delete(req.params.id, function(erro, retorno){
    if(erro){
      resposta.erro = true;
      resposta.msg = 'Não foi possível deletar os dados, consulte o administrador do sistema!';
      console.log('Erro', erro);
    }else{
      if(retorno.affectedRows){
        resposta.msg = 'Produto excluído com sucesso!';
      }else{
        resposta.erro = true;
        resposta.msg = 'Não foi excluir o produto!';
        console.log('Erro', erro);
      }
    }

    res.json(resposta);
  });
});

module.exports = router;