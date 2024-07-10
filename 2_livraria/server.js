import 'dotenv/config'
import express from "express"
import mysql from 'mysql2'
import {v4 as uuidv4} from 'uuid'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

//Criar conexão com o banco de dados MySQL

const conn = mysql.createConnection({ // usado para estebelecar conexões
    host: "localhost",
    user: "root",
    password: 'Sen@iDev77!.',
    database: 'livraria',
    port: '3306'
})

// conectar ao banco de dados

conn.connect((err)=>{
    if(err){
        console.error(err.stack) // para dizer qual foi exatamente o erro que aconteceu
    }
    console.log("MySQL conectado")
})

app.get("/livros", (request, response)=>{
    response.send("olá, Mundo!")
})

//rota 404
app.use((request, response)=>{
    response.status(404).json({message: "Rota não encontrada"})
})

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})