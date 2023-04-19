const ProdutoDAO = require("../DAO/ProdutoDAO.js");
const Produto1 = require("../models/Produto.js");

class ProdutoController {
  static rotas(app) {
    app.get("/Produto", ProdutoController.listar);
    app.post("/Produto", ProdutoController.inserir);
    app.get("/Produto/id/:id", ProdutoController.buscarPorId);
    app.delete("/Produto/id/:id", ProdutoController.deletarProduto);
    app.put("/Produto/id/:id", ProdutoController.atualizar);
  }

  static async listar(req, res) {
    const Produto = await ProdutoDAO.listar();
    res.status(200).send(Produto);
  }

  static async buscarPorId(req, res) {
    const Produto = await ProdutoDAO.buscarID(req.params.id);
    if (!Produto) {
      res.status(404).send("Produto não encontrado");
      return;
    }
    res.status(200).send(Produto);
  }

  static async inserir(req, res) {
    const produto = new Produto1(
      req.body.nome,
      req.body.descrição,
      req.body.data_de_fabricação
    );

    console.log(produto);

    if (!produto.nome || !produto.descrição || !produto.data_de_fabricação) {
      res.status(500).send("faltou campo para inserir o produto");
      return;
    }

    try {
      const result = await ProdutoDAO.inserir(produto);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
    res.status(200).send({
      Mensagem: "Produto inserido com sucesso",
      Produto: produto,
    });
  }

  static async atualizar(req, res) {
    try {
      const Produto = new Produto1(
        req.body.nome,
        req.body.descrição,
        req.body.data_de_fabricação
      );
      if (
        !Produto ||
        !Produto.nome ||
        !Produto.descrição ||
        !Produto.data_de_fabricação
      ) {
        res.status(400).send("Precisa passar todas as informações");
        return;
      }
      if (!Object.keys(Produto).length) {
        res.status(400).send("O objeto está sem chave");
        return;
      }
      const result = await ProdutoDAO.atualizar(req.params.id, Produto);
      if (result.erro) {
        res.status(500).send("Erro ao atualizar o Produto");
        return;
      }
      res
        .status(200)
        .send({ Mensagem: "Dados atualizados", "Produto: ": Produto });
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar o Produto");
    }
  }

  static async deletarProduto(req, res) {
    try {
      const Produto = await ProdutoDAO.buscarPorID(req.params.id);
    } catch (error) {
      console.log(error);
    }

    if (!Produto) {
      res.status(404).send("Produto não encontrado");
      return;
    }
    const result = await ProdutoDAO.deletar(req.params.id);
    if (result.erro) {
      res.status(400).send({ Mensagem: "Produto não deletado" });
      return;
    }
    res.status(200).send(result);
  }
}

module.exports = ProdutoController;
