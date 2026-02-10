const express = require('express')
const cors = require('cors')
const bcrypt = require("bcrypt")
const conexao = require('./db.js')

const porta = 3000
const server = express()

server.use(cors())
server.use(express.json())

server.listen(porta, () => {
    console.log("Servidor está rodando")
})


server.post("/cadastro", async (req, res) => {
    try {
        const { nome_completo, email, senha } = req.body
        const criado_em = new Date()

        if (!nome_completo || nome_completo.length < 3)
            return res.json({ resposta: "Nome inválido" })

        if (!email || email.length < 6)
            return res.json({ resposta: "Email inválido" })

        if (!senha || senha.length < 6)
            return res.json({ resposta: "A senha deve ter no mínimo 6 caracteres" })

        let sql = "SELECT * FROM cadastro WHERE email = ?"
        let [existe] = await conexao.query(sql, [email])

        if (existe.length > 0)
            return res.json({ resposta: "Email já cadastrado" })

        const hash = await bcrypt.hash(senha, 10)

        sql = "INSERT INTO cadastro (nome_completo, email, senha, criado_em) VALUES (?, ?, ?, ?)"
        let [resultado] = await conexao.query(sql, [
            nome_completo, email, hash, criado_em
        ])

        if (resultado.affectedRows === 1)
            return res.json({ resposta: "Cadastro realizado com sucesso" })

        return res.json({ resposta: "Erro ao cadastrar" })

    } catch (error) {
        console.log(error)
        return res.json({ resposta: "Erro interno" })
    }
})


server.post("/faleconosco", async (req, res) => {
    try {
        const { nome, email, assunto, mensagem } = req.body
        const dthr_status = new Date()
        const status_lei = "Aguardando resposta"

        if (!nome || nome.length < 3)
            return res.json({ resposta: "Nome inválido" })

        if (!email || email.length < 6)
            return res.json({ resposta: "Email inválido" })

        if (!assunto || assunto.length < 3)
            return res.json({ resposta: "Assunto inválido" })

        if (!mensagem || mensagem.length < 3)
            return res.json({ resposta: "Mensagem inválida" })

        let sql = "SELECT * FROM contato WHERE email = ?"
        let [existe] = await conexao.query(sql, [email])

        if (existe.length > 0)
            return res.json({ resposta: "Essa mensagem já foi enviada" })

        sql = "INSERT INTO contato (nome, email, assunto, mensagem, dthr_status, status_lei) VALUES (?, ?, ?, ?, ?, ?)"
        let [resultado] = await conexao.query(sql, [
            nome, email, assunto, mensagem, dthr_status, status_lei
        ])

        if (resultado.affectedRows === 1)
            return res.json({ resposta: "Mensagem enviada com sucesso" })

        return res.json({ resposta: "Erro ao enviar mensagem" })

    } catch (error) {
        console.log(error)
        return res.json({ resposta: "Erro interno" })
    }
})


server.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha)
            return res.json({ resposta: "Preencha todos os campos" })

        let sql = "SELECT * FROM login WHERE email = ?"
        let [usuario] = await conexao.query(sql, [email])

        if (usuario.length === 0)
            return res.json({ resposta: "Usuário não encontrado" })

        const confere = await bcrypt.compare(senha, usuario[0].senha)

        if (!confere)
            return res.json({ resposta: "Senha incorreta" })

        return res.json({ resposta: "Login realizado com sucesso" })

    } catch (error) {
        console.log(error)
        return res.json({ resposta: "Erro interno" })
    }
})


server.post("/cadastro", async (req, res) => {
    try {
        const { email, senha } = req.body
        const criado_em = new Date()
        const status_lei = "Aguardando resposta"

        if (!email || email.length < 6)
            return res.json({ resposta: "Email inválido" })

        if (!senha || senha.length < 6)
            return res.json({ resposta: "A senha deve ter ao menos 6 caracteres" })

        let sql = "SELECT * FROM login WHERE email = ?"
        let [existe] = await conexao.query(sql, [email])

        if (existe.length > 0)
            return res.json({ resposta: "E-mail já cadastrado" })

        const hash = await bcrypt.hash(senha, 10)

        sql = "INSERT INTO login (email, senha, criado_em, status_lei) VALUES (?, ?, ?, ?)"
        let [resultado] = await conexao.query(sql, [
            email, hash, criado_em, status_lei
        ])

        if (resultado.affectedRows === 1)
            return res.json({ resposta: "Usuário registrado com sucesso" })

        return res.json({ resposta: "Erro ao registrar" })

    } catch (error) {
        console.log(error)
        return res.json({ resposta: "Erro interno" })
    }
})


//ROTA DE GERENCIAMENTO DE REPUTAÇÃO

server.get("/gerenciamento", async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
})