const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const CLIENTE_SCHEMA = `
CREATE TABLE IF NOT EXISTS "Cliente" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(64),
    "email" varchar(64),
    "CPF" varchar(64),
    "endereco" varchar(64)
);`;

function criarTabelaCliente () {
    db.run(CLIENTE_SCHEMA, (error) => {
        if (error) console.log("erro ao criar tabela de clientes");
    });
}

db.serialize( () => {
    criarTabelaCliente();
});