import conn from "../config/conn.js"
import {v4 as uuidv4} from 'uuid'

export const getLivros = (request, response)=>{
    const sql = /*sql*/ `select * from livros`
    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar livros"})
            return
        }
        const livros = data // serve para desestruturar as informações e elas aparecerem da forma mais "correta"
        response.status(200).json(livros)
    })
}

export const cadastrarLivro = (request, response)=>{
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
    // const checkSql = /*sql*/ `
    // SELECT * FROM livros 
    // WHERE titulo = "${titulo}" AND 
    // autor = "${autor}" AND 
    // ano_publicacao = "${ano_publicacao}"
    // `;

    const checkSql = /*sql*/ `select * from livros
    where ?? = ? AND
    ?? = ? AND
    ?? = ?`;

    const checkSqlData = [
        "titulo",
        titulo,
        "autor",
        autor,
        "ano_publicacao",
        ano_publicacao
    ]



    conn.query(checkSql, checkSqlData, (err, data)=>{
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
        // const insertSql = /*sql*/ `insert into livros(id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) 
        // values("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}");`

        const insertSql = /*sql*/ `insert into livros(??, ??, ??, ??, ??, ??, ??)
        values(?, ?, ?, ?, ?, ?, ?)`

        const insertSqlData = [
            "livro_id",
            "titulo",
            "autor",
            "ano_publicacao",
            "genero",
            "preco",
            "disponibilidade",
            livro_id,
            titulo,
            autor,
            ano_publicacao,
            genero,
            preco,
            disponibilidade
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: 'Erro ao cadastrar o livro'})
                return console.log(err)
            }
            response.status(201).json({message: 'Livro cadastrado'})
        })
    })
}

export const buscarLivro = (request, response)=>{
    const {livro_id} = request.params // pega o id que for passado na rota

    const sql = /*sql*/ `select * from livros where ?? = ?`

    const sqlData = [
        "livro_id",
        livro_id
    ]

    conn.query(sql, sqlData, (err, data) =>{
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
}

export const editarLivro = (request,response)=>{
    const {livro_id} = request.params // pega o id que for passado na rota

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

    const checkSql = /*sql*/ ` select * from livros where ?? = ?` // aqui ele verifica no banco de dados se o id do livro corresponde ao id que está sendo passado aqui (no thunderclient)

    const checkSqlData = [
        "livro_id",
        livro_id
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        // validações para checar se o livro existe no banco de dados
        if(err){
        console.error(err)
        response.status(500).json({message: "Erro ao buscar livros"})   
        }

        if(data.length === 0){
            return response.status(404).json({message: "Livro não encontrado"})
        }

        // Consulta SQl para atualizar livro
        const updateSql = /*sql*/ ` update livros set ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? where ?? = ?`

        const updateSqlData = [
            "titulo",
            titulo,
            "autor",
            autor,
            "ano_publicacao",
            ano_publicacao,
            "genero",
            genero,
            "preco",
            preco,
            "disponibilidade",
            disponibilidade,
            "livro_id",
            livro_id
        ]
        
        conn.query(updateSql, updateSqlData, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao atualizar livro no banco de dados"})
            }
            response.status(200).json({message: "livro atualizado"})
        })
    })
}

export const deletarLivro = (request, response)=>{
    const {livro_id} = request.params // pega o id que for passado na rota

    const deleteSql = /*sql*/ `delete from livros where ?? = ?`

    const deleteSqlData = [
        "livro_id",
        livro_id
    ]


    conn.query(deleteSql, deleteSqlData, (err, info)=>{
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
}