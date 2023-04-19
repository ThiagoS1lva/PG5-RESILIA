const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const PRODUTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PRODUTOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(64),
    "DESCRIÇÃO" varchar(64),
    "DATA_DE_FABRICAÇÃO" DATE
);`;

function criaTabelaProduto () {
    db.run(PRODUTO_SCHEMA, (error) => {
        if (error) console.log("erro ao criar tabela de produtos");
    });
}

db.serialize( () => {
    criaTabelaProduto();
});