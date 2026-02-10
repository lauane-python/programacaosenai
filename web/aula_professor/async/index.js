const express = require("express")
const server = express()
const porta = 3000
const conexao = require('./db')
server.use(express.json())
const cors = require('cors')
server.use(cors())

function esperar(tempo) {
    return new Promise((resolucao) => {
        setTimeout(resolucao, tempo)
    })
}

server.get("/delivery", (req, res) => {
    console.log("Rota delivery")

    esperar(5000).then(() => {
        console.log("Sua pizza chegou")

    })

    res.send("Final")
})


server.get("/restaurante", async (req, res) => {
    console.log("Você já fez seu pedido")

    await esperar(8000).then(() => {
        console.log("Chegou seu pedido na mesa")
    })

    res.send("Você comeu seu jantar")
})


conexao.getConnection((error) => {
    //se avariavel erro esta vazia 
    if (error) {
        console.log(`Deu erro, o problema é ${error}`)
        return
    } else {
        console.log("Conectou no Banco De Dados")
    }
})


server.get("/buscar", async (req, res) => {
    const nome = "Lauane"
    try {
        const [resultado] = await conexao.query("SELECT * FROM alunos")
        res.json({"alunos":resultado})
    } catch (error) {
        console.log(error)
    }
})

server.get("/buscarcurso", async (req, res) => {
    const nome = "Banco de dados"
    try {
        const [resultado] = await conexao.query("SELECT * FROM cursos")
        res.json({"cursos":resultado})
    } catch (error) {
        console.log(error)
    }
})


server.get("/buscarid",async(req,res)=>{
    try {
        const {id_aluno} = req.query
        const[resultado] = await conexao.query(`SELECT * FROM alunos WHERE id_aluno = ${id_aluno}`)
        res.send(resultado)

    } catch (error) {
        console.log(error)        
    }
})


server.get("/buscarnome",async(req,res)=>{
    try {
        const {nome} = req.query
        const[resultado] = await conexao.query(`SELECT * FROM alunos WHERE nome LIKE '%${nome}%'`)
        res.send(resultado)
    } catch (error) {
        console.log(error)        
    }
})


server.listen(porta, () => {
    console.log("Servidor está rodando")
})
,

server.get("/buscaridcurso",async(req,res)=>{
    try {
        const {id_curso} = req.query
        const[resultado] = await conexao.query(`SELECT * FROM cursos WHERE id_curso = ${id_curso}`)
        res.send(resultado)
    } catch (error) {
        console.log(error)
    }
})


server.get("/buscarnomecurso",async(req,res)=>{
    try {
        const {nome_curso} = req.query
        const[resultado] = await conexao.query(`SELECT * FROM cursos WHERE nome_curso LIKE '%${nome_curso}%'`)
        res.send(resultado)
    } catch (error) {
        console.log(error)
    }
})


server.post('/inseriraluno',async(req,res)=>{
    try {
        const {nome, email, data_nascimento, endereco} = req.body
        const[resultado] = await conexao.query(`INSERT INTO alunos (nome, email, data_nascimento, endereco) VALUES ('${nome}','${email}','${data_nascimento}','${endereco}')`)
        res.send(resultado)
    } catch (error) {
        console.log(error)
    }
})


server.post('/inserircurso',async(req,res)=>{
    try {
        const {nome_curso, descricao, carga_horaria} = req.body
        const[resultado] = await conexao.query(`INSERT INTO cursos (nome_curso, descricao, carga_horaria) VALUES ('${nome_curso}','${descricao}','${carga_horaria}')`)
        res.send(resultado)
    } catch (error) {
        console.log(error)
    }
})