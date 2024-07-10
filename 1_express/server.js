import express from 'express' // importando
// igual a -> import express from 'express'
const PORT = 3333

const app = express() // pegando tudo o que o express tem

// Aceitar JSON
app.use(express.json()) // isso aqui vai fazer eu conseguir receber os dados lá do body do post

//Rotas
/* 
    Request HTTP
    -> query params - ...:3333/pessoas?nome="Ronaldo"&idade=17
    quando vai colocar parâmetros e assim colocar valores para eles
            Rotas do tipo GET - usado para filtrar e buscar
    
    -> route params - ...3333/pessoas/5
    quando passa valores após a rota lá
            Rotas do tipo GET, PUT, PATH, DELETE - listar um elemento


    -> body params - ...3333/pessoas
    valores que recebe pelo corpo
            Rotas do tipo POST - usadadas em cadastro de informações
*/


// QUERY PARAMS - usado nessa rota get aqui
// vamos colocar as rotas que vem do express, usando a constante app
app.get('/users', (request, response)=>{  // se eu quero a rota get tenho que passar a rota e a função de callback com requisição e resposta
    // const query = request.query
    const {nome, idade} = request.query
    console.log(nome, idade)

    response.status(200).json([
        'Pessoa 1',
        'Pessoa 2',
        'Pessoa 3'
    ]) // igual o que a gente fazia pra fazer aparecer uma mensagem de acordo com o código HTTP
}) 


// BODY PARAMS
app.post('/users', (request, response)=>{  // aqui a mesma coisa, mas com a rota POST, funciona com todos os métodos HTTP =)
    // const body = request.body
    // console.log(body)
    const {nome, idade} = request.body
    console.log(nome, idade)

    response.status(201).json([
        'Pessoa 1',
        'Pessoa 2',
        'Pessoa 3',
        'Pessoa 4'
    ])
}) 


// ROUTE PARAMS - usar nessa rota de PUT
app.put('/users/:id/:cpf', (request, response)=>{ // colocando a rota dessa forma estaremos substituindo todo o trabalho de usar o split para pegar o id e afins
    // const id = request.params.id
    // const cpf = request.params.cpf

    const {id, cpf} = request.params
    console.log(id, cpf) // vai pegar o id da rota e retornar aqui

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