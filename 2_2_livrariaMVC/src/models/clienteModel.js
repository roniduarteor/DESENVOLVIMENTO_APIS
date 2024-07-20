import conn from '../config/conn.js'

// id nome email senha imagem
const tableClientes = /*sql*/ `
    CREATE TABLE if NOT EXISTS clientes(
        id varchar(60) primary key,
        nome varchar(255) not null,
        email varchar(255) not null,
        senha varchar(255) not null,
        imagem varchar(500) not null,

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp 
    )
`

conn.query(tableClientes, (err, result, field)=>{
    if(err){
        console.error("Erro ao criar a tabela" + err.stack)
        return
    }
    console.log("Tabela [clientes] criada com sucesso")
})