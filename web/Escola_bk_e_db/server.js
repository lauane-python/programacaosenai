const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2/promise')

const conexao = require('./db.js')
const porta = 3000
const server = express()

server.use(cors())
server.use(express.json())

require('dotenv').config()
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("Servidor está rodando !")
})

server.get("/alunos", async (req, res) => {
    try {
        const [resultado] = await conexao.query("SELECT COUNT(*) as totalCadastraso FROM alunos")
        res.json({"alunos":resultado})
    } catch (error) {
        console.log(error)
    }
})