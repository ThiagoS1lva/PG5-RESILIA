//importando um módulo chamado "index.js" 
const app = require('./index.js')

// escolhendo a porta em que o servidor será aberto
const PORT = 3000;

// abrindo o servidor na porta escolhida
app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}/`)
})
