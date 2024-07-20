import conn from '../config/conn.js'

const tableFuncionarios = /*sql*/ `
    CREATE TABLE if NOT EXISTS funcionarios(


        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp 
    )
`