import "dotenv/config"
import mysql from 'mysql2'

const conn = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user:"root",
    password: "Sen@iDev77!.",
    database: "livrariaMVC",
    port: 3306,
})

// pool já faz o trabalho:

// conn.connect((err)=>{
//     if(err){
//         return console.error(err.stack)
//     }
//     console.log('MySQL Conectado')
// })

export default conn;