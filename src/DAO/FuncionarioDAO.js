// Importa o db.js para poder usar o banco de dados simulado
const db = require("../infra/db");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe coletadorController... Alguns vão dar retorno e para outros, isso não será necessário
class FuncionarioDAO {

  // GET ALL --
  static listar() {
    const query = "SELECT * FROM Funcionarios";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // GET  --  
  static buscarPorID(id) {
    const query = "SELECT * FROM Funcionarios WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  // POST
  static inserir(funcionario) {
    const query = "INSERT INTO Funcionarios (nome, cpf, cargo, salario) VALUES(?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [funcionario.nome, funcionario.cpf, funcionario.cargo, funcionario.salario], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o funcionario",
            error: err,
          });
        }
        resolve(funcionario);
      });
    });
  }

  // PUT  --  
  static atualizar(id, funcionario) {
    const query =
      "UPDATE Funcionarios SET nome = ?, cpf = ?, cargo = ?, salario = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [funcionario.nome, funcionario.cpf, funcionario.cargo, funcionario.salario, id],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o funcionario",
              erro: err,
            });
          }
          resolve({
            mensagem: "Funcionario atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM Funcionarios WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o funcionario",
            erro: err,
          });
        }
        resolve({ mensagem: "Funcionario deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
module.exports = FuncionarioDAO;