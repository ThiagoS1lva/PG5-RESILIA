const MaterialDAO = require('../DAO/MaterialDAO.js')
const Material1 = require('../models/Material.js')


class MaterialController {
    static rotas(app) {
        app.get('/Material', MaterialController.listar)
        app.get('/Material/id/:id', MaterialController.buscarPorID)
        app.post('/Material', MaterialController.inserir)
        app.put('/Material/id/:id', MaterialController.atualizaMaterial)
        app.delete('/Material/id/:id', MaterialController.deletarMaterial)
    }

    
    // GET para listar todos
    static async listar(req, res) {
        const Material = await MaterialDAO.listar()
        res.status(200).send(Material)
    }


    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const Material = await MaterialDAO.buscarPorID(req.params.id)
        if (!Material) {
            res.status(404).send("Material não encontrado")
            return
        }
        res.status(200).send(Material)
    }



    // POST - Adicionar 1 Material
    static async inserir(req, res) {
        const Material = new Material1(
            req.body.tipo,
            req.body.peso,
            req.body.quantidade,
            req.body.tamanho
        )
        if (!Material.tipo || !Material.peso || !Material.quantidade || !Material.tamanho) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await MaterialDAO.inserir(Material)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Material criado com sucesso", "Novo Material: ": Material })
    }


    // PUT - Editar um Material
    static async atualizaMaterial(req, res) {
        try {const Material = new Material1(
            req.body.tipo,
            req.body.peso,
            req.body.quantidade,
            req.body.tamanho
            
        )
        if (!Material || !Material.tipo || !Material.peso || !Material.quantidade || !Material.tamanho) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(Material).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await MaterialDAO.atualizar(req.params.id, Material)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o Material')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Material: ": Material })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar o Material')
    }}


    // DELETE - Deletar 1 Material
    static async deletarMaterial(req, res) {
        const Material = await MaterialDAO.buscarPorID(req.params.id)
        if (!Material) {
            res.status(404).send("Material não encontrado")
            return
        }
        const result = await MaterialDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Material não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

module.exports = MaterialController

