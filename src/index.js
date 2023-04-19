// Importando o packages
const express = require('express')
const cors = require('cors')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json());
app.use(cors())

// importando os controllers
const ColetadorController = require('./controllers/coletador-controller.js');
const FuncionarioController = require('./controllers/funcionario-controller.js');
const PontosdeColetaController = require('./controllers/PontosdeColeta.js');
const ClienteController = require('./controllers/cliente-controller.js');
const MaterialController = require('./controllers/material-controller.js');
const ProdutoController = require('./controllers/produto-controller.js');

ColetadorController.rotas(app);
FuncionarioController.rotas(app);
PontosdeColetaController.rotas(app);
ClienteController.rotas(app);
MaterialController.rotas(app);
ProdutoController.rotas(app)

module.exports = app
