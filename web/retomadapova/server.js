const express = require("express")
const server = express()
const porta = 3000
const conexao = require('./db')
server.use(express.json())

server.listen(3000, () => {
    console.log("Serviço rodando")
})

server.get("/questao1", (req,res) => {
    try {
        const[resultado] = await conexao.query(`SELECT * FROM tb_cadastro`)
    } catch (error) {
        
    }
})