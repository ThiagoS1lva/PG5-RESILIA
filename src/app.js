import express from "express";
import router from "./router.js";
import fs from "fs";
// Importa o pacote "https" para criar um servidor seguro (https)
import https from "https";
// Importa o pacote "cors" para permitir requisições de outros domínios
import cors from "cors";

// Cria uma instância do aplicativo Express
const app = express();

// Adiciona o middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Adiciona o middleware para permitir requisições de outros domínios
app.use(cors());

// Adiciona as rotas definidas no arquivo "router.js"
app.use(router);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor é iniciado
app.listen(3000, console.log("Servidor iniciado na porta 3000"));

// Cria um servidor https na porta 3001, utilizando o certificado e a chave especificados, e exibe uma mensagem no console quando o servidor é iniciado
https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, () => console.log('Servidor iniciado na porta 3001 em https'));
