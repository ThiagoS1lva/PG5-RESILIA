const db = require("../infra/db");

class ProdutoDAO {
    static listar() {
        const query = "SELECT * FROM PRODUTOS";
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    static inserir(produto) {
        const query = "INSERT INTO PRODUTOS (NOME, ID, DESCRIÇÃO, DATA_DE_FABRICAÇÃO) VALUES (?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            db.run(query, [produto.nome, produto.id, produto.descrição, produto.data_de_fabricação], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao inserir produto",
                        erro: err,
                    });
                }
                resolve(produto)
            });
        });
    }

    static buscarID(ID) {
        const query = "SELECT * FROM PRODUTOS WHERE ID = ?";
        return new Promise((resolve, reject) => {
            db.get(query, [ID], (err, row) => {
                if (err) {
                    reject(false);
                }
                resolve(row);
            });
        });
    }

    static atualizar(ID, produto) {
        const query = "UPDATE PRODUTOS SET NOME = ?, DESCRIÇÃO = ?, DATA_DE_FABRICAÇÃO = ? WHERE ID = ?";
        return new Promise((resolve, reject) => {
            db.run(query,[produto.nome, produto.descricao,produto.datadefabricacao, ID], (err) => {
                    if (err) {
                        reject({
                            mensagem: "Erro ao atualizar o Produto",
                            erro: err,
                        });
                    }
                    resolve({
                        mensagem: "Produto atualizado com sucesso"
                    });
                }
            );
        });
    }
    

    static deletar(id) {
        const query = "DELETE FROM PRODUTOS WHERE id = ?";
        return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
            if (err) {
              reject({
                mensagem: "Erro ao deletar o produto",
                erro: err,
              });
            }
            resolve({ mensagem: "Produto deletado com sucesso", id: id });
          });
        });
      }
}

module.exports = ProdutoDAO;
