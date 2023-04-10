// Importa o módulo sqlite3 para acesso ao banco de dados SQLite
import sqlite3 from "sqlite3";

// Importa a função open do módulo sqlite para criar a conexão com o banco de dados
import { open } from "sqlite";

// Cria a função openDB que retorna a conexão com o banco de dados
export async function openDB() {
    // Chama a função open passando as informações do banco de dados
    return open({
        filename: "./database.db", // nome do arquivo do banco de dados
        driver: sqlite3.Database, // driver do banco de dados
    });
}