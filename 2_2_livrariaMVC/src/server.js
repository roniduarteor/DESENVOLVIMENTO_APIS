// Esse é o arquivo que vai possuir as nossas configurações

import "dotenv/config"
import express from 'express'

//conexão com banco de dados
import conn from './config/conn.js'

//importacao dos modulos e criacao das tabelas
import './models/livroModel.js'
import './models/clienteModel.js'
import './models/funcionarioModel.js'
import './models/emprestimoModel.js'

// importação das nossas rotas
import livroRoutes from "./routes/livroRoutes.js"
import clienteRoutes from './routes/clienteRoutes.js'
import funcionarioRoutes from '../src/routes/funcionarioRoutes.js'
import emprestimoRoutes from '../src/routes/emprestimoRoutes.js'

const PORT = process.env.PORT

const app = express()
// esses 2 recebem objetos json, para que eu consiga cadastrar normalmente
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// utilização das rotas
// http://localhost:3333/livros
// app.use('/livros', livroRoutes) // rota só vai ser acessada se for através desse endpoint
app.use('/clientes', clienteRoutes)
app.use('/livros', livroRoutes)
app.use('/funcionarios', funcionarioRoutes)
app.use('/emprestimos', emprestimoRoutes)

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}`)
})