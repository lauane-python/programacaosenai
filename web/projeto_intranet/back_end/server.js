const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const conexao = require('./db.js');

const porta = 3000;
const server = express();

server.use(cors());
server.use(express.json());

server.listen(porta, () => {
    console.log("Servidor está rodando !");
});

// ---- Rota de cadastro/login ----
server.post("/login", async (req, res) => {
    try {
        const { email, senha, criado_em } = req.body;
        const status_lei = "Aguardando resposta";

        // valida email
        if (!email || email.length < 6) {
            return res.json({ resposta: "Preencha um email válido" });
        }

        // valida senha
        if (!senha || senha.length < 6) {
            return res.json({ resposta: "A senha tem que conter no mínimo 6 caracteres" });
        }

        // Verifica se email já existe no banco
        let sql = "SELECT * FROM login WHERE email = ?";
        let [existe] = await conexao.query(sql, [email]);

        if (existe.length > 0) {
            return res.json({ resposta: "Email já cadastrado!" });
        }

        // Gera hash da senha
        const hashGerado = await bcrypt.hash(senha, 10);

        // Salva no BD
        sql = "INSERT INTO login (email, criado_em, senha, status_lei) VALUES (?, ?, ?, ?)";
        let [resultado] = await conexao.query(sql, [email, criado_em, hashGerado, status_lei]);

        if (resultado.affectedRows === 1) {
            return res.json({ resposta: "Cadastro realizado com sucesso!" });
        }

        return res.json({ resposta: "Erro ao cadastrar" });

    } catch (error) {
        console.log(error);
        return res.json({ resposta: "Erro no servidor" });
    }
});
