// Importa o objeto Router do pacote "express"
import { Router } from 'express';

// Importa as funções do arquivo "Coletador.js" responsáveis por manipular o banco de dados
import { createTable, insertColetador, updateColetador, selectColetadores, selectColetador, deleteColetador } from "./Controller/Coletador.js";

// Cria uma instância do objeto Router
const router = Router();

// Rota para verificar se a API está rodando corretamente
router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "API RODANDO"
    })
})

// Rotas para selecionar todos os coletadores e um coletador específico
router.get('/coletadores', selectColetadores)
router.get('/coletador', selectColetador)

// Rota para inserir um novo coletador
router.post('/coletador', insertColetador)

// Rota para atualizar um coletador existente
router.put('/coletador', updateColetador)

// Rota para excluir um coletador existente
router.delete('/coletador', deleteColetador)

// Exporta o objeto Router para ser utilizado no arquivo principal (index.js)
export default router;
