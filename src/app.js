import express from "express";
import router from "./router.js";
import fs from "fs";
import https from "https";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());


app.use(router);

app.listen(3000, console.log("Servidor iniciado na porta 3000"));

https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, () => console.log('Servidor iniciado na porta 3001 em https'))