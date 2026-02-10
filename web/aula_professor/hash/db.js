//Meu arquivo de conexão com o banco de dados
const mysql = require('mysql2/promise')
//pool de conexao
const conexao = mysql.createPool({
    //criar as configurações do Banco De Dados
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"loja",
    //não necessaria, mas 10conexões simultaneas
    waitForConnections:true,
    // máximo de conexões, quando chegar 11, ele, manda esperar até uma conexões, como a de cima seja liberada
    connectionLimit:10,
    //numero de requisições simultânias, pode várias pessoas trabalhar juntas no banco
    queueLimit:0

})
//exportando o arquivo db como um módulo
module.exports =  conexao