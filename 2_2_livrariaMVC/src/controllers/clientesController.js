import conn from "../config/conn.js"
import {v4 as uuidv4} from 'uuid'

export const getCliente = (request, response)=>{
    const sql = /*sql*/ `select * from clientes`
    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar clientes"})
            return
        }
        const clientes = data // serve para desestruturar as informações e elas aparecerem da forma mais "correta"
        response.status(200).json(clientes)
    })
}

export const cadastrarCliente = (request, response)=>{
    const {nome, email, senha, imagem} = request.body 
    if(!nome){
        response.status(400).json({message: 'O nome é obrigatório!'})
        return
    }
    if(!email){
        response.status(400).json({message: 'O email é obrigatório!'})
        return
    }
    if(!senha){
        response.status(400).json({message: 'A senha é obrigatória!'})
        return
    }
    if(!imagem){
        response.status(400).json({message: 'A imagem é obrigatória!'})
        return
    }

    // const checkSql = /*sql*/ `
    // SELECT * FROM clientes 
    // WHERE email = "${email}"
    // `;

    const checkSql = /*sql*/ `
    SELECT * FROM clientes 
    WHERE ?? = ?
    `;

    const checkSqlData = [
        "email",
        email
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar os clientes"})
            return console.log(err)
        }
        if(data.length > 0){ 
            response.status(409).json({message: 'Cliente já cadastrado na base de dados'}) // 409 - deu certo mas não esparava esses dados
            return console.log(err)
        }

        const id = uuidv4() // passando o id aleatório através do uuid

        // agora vamos cadastrar as informações
        // const insertSql = /*sql*/ `insert into clientes(id, nome, email, senha, imagem) 
        // values("${id}","${nome}","${email}","${senha}","${imagem}");`

        const insertSql = /*sql*/ `insert into clientes(??, ??, ??, ??, ??) 
        values(?,?,?,?,?);`

        const insertSqlData = [
            "id",
            "nome",
            "email",
            "senha",
            "imagem",
            id,
            nome,
            email,
            senha,
            imagem
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: 'Erro ao cadastrar o cliente'})
                return console.log(err)
            }
            response.status(201).json({message: 'Cliente cadastrado'})
        })
    })
}

export const buscarCliente = (request, response)=>{
    const {id} = request.params // pega o id que for passado na rota

    const sql = /*sql*/ `select * from clientes where ?? = ?`

    const sqlData = [
        "id",
        id
    ]

    conn.query(sql, sqlData, (err, data) =>{
        if(err){
            response.status(500).json({message: "Erro ao buscar cliente"})
            return
        }

        if(data.length === 0){
            response.status(404).json({message: "Cliente não encontrado"})
            return
        }
        const cliente = data[0]
        response.status(200).json(cliente)
    })
}

export const editarCliente = (request,response)=>{
    const {id} = request.params
    const {nome, email, senha, imagem} = request.body 
    if(!nome){
        response.status(400).json({message: 'O nome é obrigatório!'})
        return
    }
    if(!email){
        response.status(400).json({message: 'O email é obrigatório!'})
        return
    }
    if(!senha){
        response.status(400).json({message: 'A senha é obrigatória!'})
        return
    }
    if(!imagem){
        response.status(400).json({message: 'A imagem é obrigatória!'})
        return
    }

    const checkSql = /*sql*/ `
    SELECT * FROM clientes 
    WHERE ?? = ?
    `;

    const checkSqlData = [
        "email",
        email
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar os clientes"})
            return console.log(err)
        }
        if(data.length > 0){ 
            response.status(409).json({message: 'Cliente já cadastrado na base de dados'}) // 409 - deu certo mas não esparava esses dados
            return console.log(err)
        }

        const updateSql = /*sql*/ ` update clientes set nome = "${nome}", email = "${email}", senha = "${senha}", imagem = "${imagem}" where id = "${id}"`
        
        conn.query(updateSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao atualizar cliente no banco de dados"})
            }
            response.status(200).json({message: "Cliente atualizado"})
        })
    })
}

export const deletarCliente = (request, response)=>{
    const {id} = request.params // pega o id que for passado na rota

    const deleteSql = /*sql*/ `delete from clientes where ?? = ?`

    const deleteSqlData = [
        "id",
        id
    ]

    conn.query(deleteSql, deleteSqlData, (err, info)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: 'Erro ao deletar cliente'})
        }
        console.log(info)
        if(info.affectedRows === 0){
            response.status(404).json({messagae: "Cliente não encontrado"})
            return
        }

        response.status(200).json({message: 'Cliente selecionado foi deletado'})
    })
}