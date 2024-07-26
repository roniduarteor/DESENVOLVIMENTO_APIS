import conn from '../config/conn.js'

const tableOnibus = /*sql*/ `
    create table if not exists onibus(
        onibus_id varchar(60) primary key not null,
        placa varchar(255) not null,
        modelo varchar(255) not null,
        anoFabricacao date not null,
        capacidade int not null,
        
        id_linha varchar(60) not null,
        id_motorista varchar(60) not null,

        foreign key (id_linha) references linhas(linha_id),
        foreign key (id_motorista) references motoristas(motorista_id),

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableOnibus, (err)=>{
    if(err){
        console.log("Erro ao criar a tabela")
        return console.error(err)
    }
    console.log("Tabela [Onibus] criada!")
})