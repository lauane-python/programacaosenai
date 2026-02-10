const express = require('express')
const cors = require('cors')
const mysql = require("mysql2/promise")
//Importar o Módulo de conexão com BD
const conexao = require('./db.js')
const porta = 3000
const server = express()
//Módulo Crypto --> serve para gerar hashs
const crypto = require('crypto')


server.use(cors())
//consegue acessar os dados do body
server.use(express.json())

server.listen (porta, () => {
    console.log("Servidor está rodando !")
})

//criando rotas
//validação
server.post("/hash", async (req,res) =>{
    try {
        let {senha_usuario} = req.body 

        //la ua ne

        let nome = "Lauane"
        console.log(nome.replace(" "," "))

        senha_usuario = senha_usuario.trim()
        senha_usuario = senha_usuario.replace((" "," "))
        
        //lauane
        //outro array 
        //['!','@','+']
        //['d','e','v','A','@','2','0','2','5']

        if(senha_usuario==""){
            return res.send("Preencha uma senha")
        }else if(senha_usuario.length <6){
            return res.send("A senha tem que conter no mínimo 6 caracteres ")
        }

        const hash = crypto.createHash("sha256").update(senha_usuario).digest("hex")
        res.send(`Usuário cadastrado com sucesso!${hash}`)

    } catch (error) {
        console.log(error)
    }
})

server.post("/cadastro", async (req,res) => {
    try {
        const{nome_completo, email, caminho_foto} = req.body
        //validar as informações(todos - o caminho_foto, pois esta null )

        //limpar todos espaços da senha
        let {senha} = req.body0
         senha = senha.trim()
        senha = senha.replace((" "," "))

        //tratativas se esta tudo certo a senha
        if(senha==""){
            return res.json({"resposta":"Preencha uma senha"})
        }else if(senha.length <6){
            return res.json({"resposta":"A senha tem que conter no mínimo 6 caracteres "})
        }else if(email.length <6){
            return res.json({"resposta":"Preencha o seu email"})
        }else if(nome_completo.length <6){
            return res.json({"resposta":"Preencha o seu nome completo"})
        }

        //Verificar se o email já está cadastrado
        let sql = `SELECT * FROM usuarios WHERE email = ?`
        let [resultado] = await conexao.query(sql,[email])
        if (resultado.length != 0){
            return res.json({"resposta":"Email já cadastrado!"})
        }

        // Cria o hash da senha e insere o novo usuário no banco de dados
        const hash = crypto.createHash("sha256").update(senha).digest("hex")
        sql = `INSERT INTO usuarios (nome_completo, email, senha, caminho_foto) VALUES (?,?,?,?)`
        let [resultado2] = await conexao.query(sql,[nome_completo, email, hash, caminho_foto])

        //Final do post /cadastro
        if(resultado2.affectedRows == 1){
            return res.json({"resposta":"cadastro efetuado com sucesso!"})
        }else{
            return res.json({"resposta":"Erro ao fazer cadastro"})
        }
    } catch (error) {
        console.log(error)
    }
})


server.post("/login", async (req,res)=> {
    try {

        const {email} = req.body
        let{senha} = req.body

        senha = senha.trim()
        senha = senha.replace((" "," "))
        if(senha==""){
            return res.send("Preencha uma senha")
        }else if(senha.length <6){
            return res.send("A senha tem que conter no mínimo 6 caracteres ")
        }
        const hash = crypto.createHash("sha256").update(senha).digest("hex")

        const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`
        const [resultado] = await conexao.query(sql,[email, hash])
        console.log(resultado)
        if(resultado.length == 1){
            res.send("Você acertou o login e senha")
        }else{
            res.send("Usuário ou senha inválida")
        }
    } catch (error) {
        console.log(error)
    }
})


server.post("/cadastrar", async (req,res) => {
    try {
        const{nome, status_p, preco, qtde_estoque, caminho_foto} = req.body
        //validar as informações(todos - o caminho_foto, pois esta null )
        const sql = `INSERT INTO produtos (nome, status_p, preco, qtde_estoque, caminho_foto) VALUES (?,?,?,?,?)`

        const [resultado] = await conexao.query(sql,[nome, status_p, preco, qtde_estoque, caminho_foto])

        res.send(resultado)

    } catch (error) {
        console.log(error)
    }
})


server.post("/adicionaritem", async (req,res) => {
    try {
        const{id, valor_total} = req.body
        //validar as informações(todos - o caminho_foto, pois esta null )
        const sql = `INSERT INTO pedidos (id, valor_total) VALUES (?,?)`

        const [resultado] = await conexao.query(sql,[id, valor_total])

        res.send(resultado)

    } catch (error) {
        console.log(error)
    }
})

server.get("/login", async (req,res)=> {
    try {

        const {email} = req.body

        const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`
        const [resultado] = await conexao.query(sql,[email, hash])
        console.log(resultado)
        if(resultado.length == 1){
            res.send("Você acertou o login e senha")
        }else{
            res.send("Usuário ou senha inválida")
        }
    } catch (error) {
        console.log(error)
    }
})