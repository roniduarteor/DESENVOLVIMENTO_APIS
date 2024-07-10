import express from 'express' // importando
// igual a -> import express from 'express'
const PORT = 3333

const app = express() // pegando tudo o que o express tem

// vamos colocar as rotas que vem do express, usando a constante app
app.get('/users', (request, response)=>{  // se eu quero a rota get tenho que passar a rota e a função de callback com requisição e resposta
    response.status(200).json([
        'Pessoa 1',
        'Pessoa 2',
        'Pessoa 3'
    ]) // igual o que a gente fazia pra fazer aparecer uma mensagem de acordo com o código HTTP
}) 

app.post('/users', (request, response)=>{  // aqui a mesma coisa, mas com a rota POST, funciona com todos os métodos HTTP =)
    response.status(201).json([
        'Pessoa 1',
        'Pessoa 2',
        'Pessoa 3',
        'Pessoa 4'
    ])
}) 

app.put('/users', (request, response)=>{
    response.status(200).json([
        'Pessoa 1',
        'Pessoa 10',
        'Pessoa 3',
        'Pessoa 4'
    ])
})

app.patch('/users', (request, response)=>{ 
    response.status(200).json({msg: 'PATCH'})
}) 

app.delete('/users', (request, response)=>{  
    response.status(204).json([
        'Pessoa 10',
        'Pessoa 3',
        'Pessoa 4'
    ])
}) 

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})