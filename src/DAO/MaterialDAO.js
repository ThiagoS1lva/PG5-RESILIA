// Importa o db.js para poder usar o banco de dados simulado
const db = require("../infra/db");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe MaterialController... Alguns vão dar retorno e para outros, isso não será necessário
class MaterialDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM Material";
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
    const query = "SELECT * FROM Material WHERE id = ?";
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
  static inserir(Material) {
    const query = "INSERT INTO Material (tipo, peso, quantidade, tamanho) VALUES(?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [Material.tipo, Material.peso, Material.quantidade, Material.tamanho], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o Material",
            error: err,
          });
        }
        resolve(Material);
      });
    });
  }

  // PUT  --  
  static atualizar(id, Material) {
    const query =
      "UPDATE Material SET tipo = ?, peso = ?, quantidade = ?, tamanho = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [Material.tipo, Material.peso, Material.quantidade, Material.tamanho, id],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o Material",
              erro: err,
            });
          }
          resolve({
            mensagem: "Material atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM Material WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o Material",
            erro: err,
          });
        }
        resolve({ mensagem: "Material deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
module.exports = MaterialDAO;