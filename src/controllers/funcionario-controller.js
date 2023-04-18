const FuncionarioDAO = require('../DAO/FuncionarioDAO.js');
const Funcionario = require('../models/Funcionario.js');


class FuncionarioController {
    static rotas(app) {
        app.get('/Funcionarios', FuncionarioController.listar)
        app.get('/Funcionario/id/:id', FuncionarioController.buscarPorID)
        app.post('/Funcionario', FuncionarioController.inserir)
        app.put('/Funcionario/id/:id', FuncionarioController.atualizar)
        app.delete('/Funcionario/id/:id', FuncionarioController.deletar)
    }

    
    // GET - listar todos os registros
    static async listar(req, res) {
        const funcionario = await FuncionarioDAO.listar()
        res.status(200).send(funcionario)
    }


    // GET - listar registro por ID passado por paramêtro de rota
    static async buscarPorID(req, res) {
        const funcionario = await FuncionarioDAO.buscarPorID(req.params.id)
        if (!funcionario) {
            res.status(404).send("Funcionario não encontrado")
            return
        }
        res.status(200).send(funcionario)
    }



    // POST - Adicionar funcionário ao banco de dados
    static async inserir(req, res) {
        const funcionario = new Funcionario(
            req.body.nome,
            req.body.cpf,
            req.body.cargo,
            req.body.salario
        )
        if (!funcionario.nome || !funcionario.cpf || !funcionario.cargo || !funcionario.salario) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await FuncionarioDAO.inserir(funcionario)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Funcionário adicionado com sucesso", "Novo funcionário: ": funcionario })
    }


    // PUT - Editar registros de funcionário
    static async atualizar(req, res) {
        try {const funcionario = new Funcionario(
            req.body.nome,
            req.body.cpf,
            req.body.cargo,
            req.body.salario
        )
        if (!funcionario.nome || !funcionario.cpf || !funcionario.cargo || !funcionario.salario) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(funcionario).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await FuncionarioDAO.atualizar(req.params.id, funcionario)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar as informações do funcionário')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Funcionário: ": funcionario })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar as informações do funcionário')
    }}


    // DELETE - Deletar funcionário do banco de dados por ID
    static async deletar(req, res) {
        const funcionario = await FuncionarioDAO.buscarPorID(req.params.id)
        if (!funcionario) {
            res.status(404).send("Funcionário não encontrado")
            return
        }
        const result = await FuncionarioDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Funcionário não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

module.exports = FuncionarioController;

