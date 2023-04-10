import { Router } from 'express';
import { createTable, insertColetador, updateColetador, selectColetadores, selectColetador, deleteColetador } from "./Controller/Coletador.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "API RODANDO"
    })
})

router.get('/coletadores', selectColetadores)
router.get('/coletador', selectColetador)
router.post('/coletador', insertColetador)
router.put('/coletador', updateColetador)
router.delete('/coletador', deleteColetador)

export default router;