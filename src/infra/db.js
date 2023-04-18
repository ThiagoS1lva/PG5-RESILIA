const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/infra/database.db');

const string = `CREATE TABLE Funcionarios(  
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        nome TEXT(50),
        cpf INT(11),
        cargo VARCHAR(30),
        salario INT(8)
    );`

// //Processamento de sinal
process.on('SIGINT', () =>
    db.close(() => {
        console.log('Banco de dados encerrado!');
        process.exit(0);
    })
);

module.exports = db;