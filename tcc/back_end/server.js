const express = require('express')
const cors = require('cors')
const conexao = require('./db.js')

const porta = 3000
const server = express()

server.use(cors())
server.use(express.json())

server.listen(porta, () => {
    console.log("Servidor está rodando !")
})