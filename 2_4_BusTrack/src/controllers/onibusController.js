import conn from '../config/conn.js'
import {v4 as uuidv4} from 'uuid'

export const postOnibus = (request, response)=>{

    const {placa, modelo, anoFabricacao, capacidade, id_linha, id_motorista} = request.body

    if(!placa){
        response.status(400).json({message: 'a placa é é obrigatória!'})
        return
    }
    if(!modelo){
        response.status(400).json({message: 'o modelo é obrigatório!'})
        return
    }
    if(!anoFabricacao){
        response.status(400).json({message: 'O ano de fabricação é obrigatório!'})
        return
    }
    if(!capacidade){
        response.status(400).json({message: 'A capacidade é obrigatória!'})
        return
    }
    if(!id_linha){
        response.status(400).json({message: 'A identidicação da linha é obrigatória!'})
        return
    }
    if(!id_motorista){
        response.status(400).json({message: 'A identidicação do motorista é obrigatória!'})
        return
    }

    const checkSql = /*sql*/ `
    select * from onibus
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "placa",
        placa,
        "modelo",
        modelo,
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de ônibus"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "ônibus já cadastrado"})
            return console.log(err)
        }

        const onibus_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into onibus(??, ??, ??, ??,??, ??, ??)
        values(?, ?, ?, ?, ?, ?, ?)
        `

        const insertSqlData = [
            "onibus_id",
            "placa",
            "modelo",
            "anoFabricacao",
            "capacidade",
            "id_linha",
            "id_motorista",
            onibus_id,
            placa,
            modelo,
            anoFabricacao,
            capacidade,
            id_linha,
            id_motorista
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao cadastrar ônibus"})
                return console.log(err)
            }

            response.status(201).json({message: 'ônibus cadastrado!'})
        })
    })
}

export const getIdOnibus = (request, response)=>{
    const {onibus_id} = request.params

    const sql = /*sql*/ `
    select * from onibus 
    inner join linhas on onibus.id_linha = linhas.linha_id
    inner join motoristas on onibus.id_motorista = motoristas.motorista_id
    where ?? = ?`

    const sqlData = [
        "onibus_id",
        onibus_id
    ]

    conn.query(sql, sqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar onibus"})
            return console.log(err)
        }

        if(data.length === 0){
            response.status(404).json({message: "onibus não encontrado"})
            return console.log(onibus_id)
        }

        const onibus = data[0]
        response.status(200).json(onibus)
    })
}

export const getOnibus = (request, response)=>{
    const sql = /*sql*/ `
    select *
    from onibus
    inner join linhas on onibus.id_linha = linhas.linha_id
    inner join motoristas on onibus.id_motorista = motoristas.motorista_id
    `

    

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar onibus existentes"})
            return console.log(err)
        }

        const onibus = data
        response.status(200).json(onibus)
    })
}