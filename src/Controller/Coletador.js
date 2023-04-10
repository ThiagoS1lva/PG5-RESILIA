// Importa a função "openDB" do arquivo "configDB.js" responsável por abrir o banco de dados
import { openDB } from '../configDB.js';

// Função que cria a tabela "Coletadores" caso ela não exista
export async function createTable() {
    openDB().then(db => {
        db.exec(`
        CREATE TABLE IF NOT EXISTS Coletadores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          email TEXT,
          cpf TEXT NOT NULL CHECK (LENGTH(cpf) = 11),
          data_nascimento DATE NOT NULL
        )
      `);
    });
}

// Função que retorna todos os coletadores cadastrados na tabela "Coletadores"
export async function selectColetadores(req, res) {
    openDB().then(db => {
        db.all('SELECT * FROM Coletadores')
            .then(coletadores => res.json(coletadores))
    });
}

// Função que retorna um único coletador com base no seu id
export async function selectColetador(req, res) {
    let id = req.body.id
    openDB().then(db => {
        db.get('SELECT * FROM Coletadores WHERE id=?', [id])
            .then(pessoa => res.json(pessoa))
    });
}

// Função que insere um novo coletador na tabela "Coletadores"
export async function insertColetador(req, res) {
    let Coletador = req.body;
    openDB().then(db => {
        db.run('INSERT INTO Coletadores (nome, email, cpf, data_nascimento) VALUES (?,?,?,?)', [Coletador.nome, Coletador.email, Coletador.cpf, Coletador.data_nascimento]);
    });
    res.json({
        "statusCode": 200
    })
}

// Função que atualiza um coletador existente na tabela "Coletadores"
export async function updateColetador(req, res) {
    let Coletador = req.body;
    openDB().then(db => {
        db.run('UPDATE Coletadores SET nome=?, email=?, cpf=?, data_nascimento=? WHERE id=?', [Coletador.nome, Coletador.email, Coletador.cpf, Coletador.data_nascimento, Coletador.id]);
    });
    res.json({
        "statusCode": 200
    })
}

// Função que exclui um coletador existente na tabela "Coletadores" com base no seu id
export async function deleteColetador(req, res) {
    let id = req.body.id
    openDB().then(db => {
        db.get('DELETE FROM Coletadores WHERE id=?', [id])
            .then(res => res)
    });
    res.json({
        "statusCode": 200
    })
}

// Função que exclui a coluna "endereco" da tabela "Coletadores"
export async function deleteColumn() {
    openDB().then(db => {
        db.exec(`
        ALTER TABLE Coletadores DROP COLUMN endereco;`)
    })
}
