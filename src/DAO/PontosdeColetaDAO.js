// Importa o db.js para poder usar o banco de dados simulado
const db = require("../infra/db");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe PontosdeColetaController... Alguns vão dar retorno e para outros, isso não será necessário
class PontosdeColetaDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM PontosdeColeta";
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
    const query = "SELECT * FROM PontosdeColeta WHERE id = ?";
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
  static inserir(PontosdeColeta) {
    const query = "INSERT INTO PontosdeColeta (empresa, horario, lugar, dia) VALUES( ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [PontosdeColeta.empresa,  PontosdeColeta.horario, PontosdeColeta.lugar, PontosdeColeta.dia], (err) =>  {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o Ponto de Coleta",
            error: err,
          });
        }
        resolve(PontosdeColeta);
      });
    });
  }

  // PUT  --  
  static atualizar(id, PontosdeColeta) {
    const query =
      "UPDATE PontosdeColeta SET empresa = ?, horario =  ?, lugar = ?, dia = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [PontosdeColeta.empresa, PontosdeColeta.horario, PontosdeColeta.lugar, PontosdeColeta.dia, id],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o Ponto de Coleta",
              erro: err,
            });
          }
          resolve({
            mensagem: "Ponto de Coleta atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM PontosdeColeta WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o Ponto de Coleta",
            erro: err,
          });
        }
        resolve({ mensagem: "Ponto de Coleta deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
module.exports = PontosdeColetaDAO;