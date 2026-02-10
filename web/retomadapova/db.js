const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:'escola',
    waitForConnections:true,
    connectionLimit:10
})
module.exports = pool