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