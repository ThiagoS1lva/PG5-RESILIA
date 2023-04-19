const PontosdeColetaDAO = require('../DAO/PontosdeColetaDAO.js')
const PontosdeColeta1 = require('../models/PontosdeColeta.js')


class PontosdeColetaController {
    static rotas(app) {
        app.get('/PontosdeColetas', PontosdeColetaController.listar)
        app.get('/PontosdeColeta/id/:id', PontosdeColetaController.buscarPorID)
        app.post('/PontosdeColeta', PontosdeColetaController.inserir)
        app.put('/PontosdeColeta/id/:id', PontosdeColetaController.atualizaPontosdeColeta)
        app.delete('/PontosdeColeta/id/:id', PontosdeColetaController.deletarPontosdeColeta)
    }

    
    // GET para listar todos
    static async listar(req, res) {
        const PontosdeColetaes = await PontosdeColetaDAO.listar()
        res.status(200).send(PontosdeColetaes)
    }


    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const PontosdeColeta = await PontosdeColetaDAO.buscarPorID(req.params.id)
        if (!PontosdeColeta) {
            res.status(404).send("Ponto de Coleta não encontrado")
            return
        }
        res.status(200).send(PontosdeColeta)
    }



    // POST - Adicionar 1 PontosdeColeta
    static async inserir(req, res) {
        const PontosdeColeta = new PontosdeColeta1(
            req.body.empresa,
            req.body.horario,
            req.body.lugar,
            req.body.dia
        )
        if (!PontosdeColeta.lugar || !PontosdeColeta.horario || !PontosdeColeta.empresa || !PontosdeColeta.dia) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await PontosdeColetaDAO.inserir(PontosdeColeta)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Ponto de Coleta criado com sucesso", "Novo Ponto de Coleta: ": PontosdeColeta })
    }


    // PUT - Editar um PontosdeColeta
    static async atualizaPontosdeColeta(req, res) {
        try {const PontosdeColeta = new PontosdeColeta1(
            req.body.empresa,
            req.body.horario,
            req.body.lugar,
            req.body.dia
    
        )
        if (!PontosdeColeta.lugar || !PontosdeColeta.horario || !PontosdeColeta.empresa || !PontosdeColeta.dia) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(PontosdeColeta).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await PontosdeColetaDAO.atualizar(req.params.id, PontosdeColeta)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o PontosdeColeta')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Ponto de Coleta: ": PontosdeColeta })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar o Ponto de Coleta')
    }}


    // DELETE - Deletar 1 PontosdeColeta
    static async deletarPontosdeColeta(req, res) {
        const PontosdeColeta = await PontosdeColetaDAO.buscarPorID(req.params.id)
        if (!PontosdeColeta) {
            res.status(404).send("Ponto de Coleta não encontrado")
            return
        }
        const result = await PontosdeColetaDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Ponto de Coleta não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

module.exports = PontosdeColetaController

