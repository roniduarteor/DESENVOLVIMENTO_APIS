import 'dotenv/config'
import express from "express"
import mysql from 'mysql2'
import {v4 as uuidv4} from 'uuid'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

//Criar conexão com o banco de dados MySQL

// const conn = mysql.createConnection({ // usado para estebelecar conexões
//     host: "localhost",
//     user: "root",
//     password: 'Sen@iDev77!.',
//     database: 'livraria_js',
//     port: '3306'
// })

// conectar ao banco de dados

/******************************* rotas de Livros *******************************/



app.get("/livros", (request, response)=>{

    // QUERY para o banco de dados - jeito bonito de falar "consulta"
    const  sql = /*sql*/ `SELECT * FROM livros` // cria uma coisa aqui para poder passar essa instrução do SQL depois
    // agora preciso estabelecer a conexão com o banco de dados para fazer a query (consulta)
    conn.query(sql, (err, data)=>{ // query recebe 2 parâmetros - 1º a variável (da consulta em si) //// 2º função callback
        if(err){
            response.status(500).json({message: 'Erro ao buscar os livros'})
            return console.log(err)
        }
        const livros = data // desestruturação
        console.log(data) // ver o que ta vindo do banco de dados
        console.log(typeof data) // ver o tipo de dado que está vindo (string, boolean, numérico e afins)
        response.status(200).json(livros)
    }) 
})

app.post("/livros", (request, response)=>{
    const {titulo, autor, ano_publicacao, genero, preco} = request.body // tá recebendo as requisições

    // validação
    // vai ser um if para cada umas das informações, para garantir que não venham vazios
    if(!titulo){
        response.status(400).json({message: 'O título é obrigatório!'})
        return
    }
    if(!autor){
        response.status(400).json({message: 'O autor é obrigatório!'})
        return
    }
    if(!ano_publicacao){
        response.status(400).json({message: 'O ano de publicação é obrigatório!'})
        return
    }
    if(!genero){
        response.status(400).json({message: 'O genero é obrigatório!'})
        return
    }
    if(!preco){
        response.status(400).json({message: 'O preco é obrigatório!'})
        return
    }

    // cadastrar um livro -> antes preciso saber se esse livro existe
    const checkSql = /*sql*/ `
    SELECT * FROM livros 
    WHERE titulo = "${titulo}" AND 
    autor = "${autor}" AND 
    ano_publicacao = "${ano_publicacao}"
    `;

    conn.query(checkSql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar os livros"})
            return console.log(err)
        }
        if(data.length > 0){ // se for maior que 0 significa que já existe um livro com essas informações
            response.status(409).json({message: 'Livro já cadastrado na base de dados'}) // 409 - deu certo mas não esparava esses dados
            return console.log(err)
        }

        const id = uuidv4() // passando o id aleatório através do uuid
        const disponibilidade = 1 // aqui coloca 1 pq o banco de dados lá vai interpretar que está disponivel, e se estamos cadastrando é pq iremos ter o livro disponível

        // agora vamos cadastrar as informações
        const insertSql = /*sql*/ `insert into livros(id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) 
        values("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}");`

        conn.query(insertSql, (err)=>{
            if(err){
                response.status(500).json({message: 'Erro ao cadastrar o livro'})
                return console.log(err)
            }
            response.status(201).json({message: 'Livro cadastrado'})
        })
    })
})

app.get('/livros/:id', (request, response)=>{
    const {id} = request.params // pega o id que for passado na rota

    const sql = /*sql*/ `select * from livros where id = "${id}"`
    conn.query(sql, (err, data) =>{
        if(err){
            response.status(500).json({message: "Erro ao buscar livro"})
            return
        }

        if(data.length === 0){
            response.status(404).json({message: "Livro não encontrado"})
            return
        }
        const livro = data[0] // pra poder receber só o objeto, pq ele estava recebendo os livros dentro um outro objeto
        response.status(200).json(livro)
    })
})

app.put('/livros/:id', (request, response)=>{
    const {id} = request.params // pega o id que for passado na rota

    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body

    // validações
    if(!titulo){
        response.status(400).json({message: 'O título é obrigatório!'})
        return
    }
    if(!autor){
        response.status(400).json({message: 'O autor é obrigatório!'})
        return
    }
    if(!ano_publicacao){
        response.status(400).json({message: 'O ano de publicação é obrigatório!'})
        return
    }
    if(!genero){
        response.status(400).json({message: 'O genero é obrigatório!'})
        return
    }
    if(!preco){
        response.status(400).json({message: 'O preco é obrigatório!'})
        return
    }

    if(disponibilidade === undefined){ // precisa ser um valor de 1 ou 0, se for undefined ent está tendo algum erro, por isso a validação - O 0 representa um falso no banco de dados, ou seja, não tem disponibilidade
        response.status(400).json({message: "A disponibilidade é obrigatória"})
        return
    }

    const checkSql = /*sql*/ ` select * from livros where id = "${id}"` // aqui ele verifica no banco de dados se o id do livro corresponde ao id que está sendo passado aqui (no thunderclient)
    conn.query(checkSql, (err, data)=>{
        // validações para checar se o livro existe no banco de dados
        if(err){
        console.error(err)
        response.status(500).json({message: "Erro ao buscar livros"})   
        }

        if(data.length === 0){
            return response.status(404).json({message: "Livro não encontrado"})
        }

        // Consulta SQl para atualizar livro
        const updateSql = /*sql*/ ` update livros set titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}" where id = "${id}"`
        
        conn.query(updateSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao atualizar livro no banco de dados"})
            }
            response.status(200).json({message: "livro atualizado"})
        })
    })
})

app.delete('/livros/:id', (request, response)=>{
    const {id} = request.params // pega o id que for passado na rota

    const deleteSql = /*sql*/ `delete from livros where id = "${id}"`
    conn.query(deleteSql, (err, info)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: 'Erro ao deletar livro'})
        }
        console.log(info)
        if(info.affectedRows === 0){
            response.status(404).json({messagae: "Livro não encontrado"})
            return
        }

        response.status(200).json({message: 'Livro selecionado foi deletado'})
    })
})


/******************************* rotas de Funcionários *******************************/
/* id, nome, cargo, data_contratacao, salario, email, created_at, updated_at */
// tem que ter validação para o email ser diferente
// Rota 01 -> lista todos OK
// Rota 02 -> cadastra funcionário ( único email por funcionário ) OK
// Rota 03 -> Lista UM(1) funcionário OK
// Rota 04 -> Atualiza UM(1) funcionário OK
// rota 05 -> Deletar Um(1) funcionário

const conn = mysql.createConnection({ // usado para estebelecar conexões
    host: "localhost",
    user: "root",
    password: 'Sen@iDev77!.',
    database: 'funcionarios',
    port: '3306'
})

conn.connect((err)=>{
    if(err){
        console.error(err.stack) // para dizer qual foi exatamente o erro que aconteceu
    }
    console.log("MySQL conectado")
})

app.get('/funcionarios', (request, response)=>{
    const sql = /*sql*/`SELECT * FROM funcionarios`

    conn.query(sql, (err, data)=>{
        if(err){
        console.error(err)
        response.status(500).json({message: "Erro ao buscar todos os funcionarios"}) 
        return   
        }
        const livros = data
        response.status(200).json(livros)
    })
})

app.post('/funcionarios', (request, response)=>{
    const {nome, cargo, data_contratacao, salario, email} = request.body

    if(!nome){
        response.status(500).json({message: "Nome do funcionário é obrigatório"})
        return
    }
    if(!cargo){
        response.status(500).json({message: "cargo do funcionário é obrigatório"})
        return
    }if(!data_contratacao){
        response.status(500).json({message: "A data de contratação do funcionário é obrigatório"})
        return
    }if(!salario){
        response.status(500).json({message: "salario do funcionário é obrigatório"})
        return
    }if(!email){
        response.status(500).json({message: "email do funcionário é obrigatório"})
        return
    }

    

    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios
    WHERE email = "${email}"
    `
    
    conn.query(checkSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Não foi possível verificar se o funcionário possuí registro"})
            return
        }
        if(data.length > 0){
            response.status(409).json({message: "Funcionário já cadastrado com esse email"})
            return
        }

        const id = uuidv4()

        const insertSql = /*sql*/ `INSERT INTO funcionarios(id, nome, cargo, data_contratacao, salario, email)
        VALUES("${id}","${nome}","${cargo}","${data_contratacao}","${salario}","${email}")`

        conn.query(insertSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao cadastrar funcionário"})
                return
            }

            response.status(201).json({message: "Funcionário cadastrado!"})
        })
    })

    
})

app.get('/funcionarios/:id', (request, response)=>{
    const {id} = request.params

    const sql = /*sql*/ `SELECT * FROM funcionarios WHERE id = "${id}"`
    conn.query(sql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao tentar buscar funcionário"})
            return
        }

        if(data.length === 0){
            response.status(404).json({message: "Funcionário não encontrado!"})
            return
        }

        const funcionario = data[0]
        response.status(200).json(funcionario)
    })
})

app.put('/funcionarios/:id', (request, response)=>{
    const {id} = request.params
    const {nome, cargo, data_contratacao, salario, email} = request.body

    if(!nome){
        response.status(500).json({message: "Nome do funcionário é obrigatório"})
        return
    }
    if(!cargo){
        response.status(500).json({message: "cargo do funcionário é obrigatório"})
        return
    }if(!data_contratacao){
        response.status(500).json({message: "A data de contratação do funcionário é obrigatório"})
        return
    }if(!salario){
        response.status(500).json({message: "salario do funcionário é obrigatório"})
        return
    }if(!email){
        response.status(500).json({message: "email do funcionário é obrigatório"})
        return
    }

    const checkSql = /*sql*/ `SELECT * FROM funcionarios WHERE id = "${id}"`

    conn.query(checkSql, (err, data)=>{
        if(err){
            console.log(err)
            response.status(500).json({message: "Erro ao verificar se funcionário já está cadastrado"})
            return
        }

        if(data.length === 0){
            response.status(500).json({message: "Funcionário não existe no banco de dados"})
            return
        }

        const updateSql = /*sql*/ `UPDATE funcionarios SET nome = "${nome}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}", email = "${email}" WHERE id = "${id}"`

        const checkSqlEmail = /*sql*/ `
        SELECT * FROM funcionarios
        WHERE email = "${email}"`

        conn.query(checkSqlEmail, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao verificar se email já está cadastrado"})
                return
            }
        })

        conn.query(updateSql, (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: 'Erro ao atualizar funcionário'})
                return
            }
            response.status(201).json({message: 'Informções atualizadas!'})
        })
    })
})



//rota 404
app.use((request, response)=>{
    response.status(404).json({message: "Rota não encontrada"})
})

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})