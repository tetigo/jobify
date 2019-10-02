const init = conn => {
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const path = require('path')
    const process = require('process')
    
    
    const routes = require('./routes') //arq. index não precisa colocar devido nome ser carregado por padrao
    
    app.use('/admin', (req, res, next)=>{
        if(req.hostname === 'localhost'){
            next()
        }else{
            res.send('Nao Permitido')
        }
    })
    
    
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.use(express.static(path.join(__dirname,'public')))
    app.use(bodyParser.urlencoded({extended: true}))
    
    
    app.use(routes(conn))

    return app
    
    // usado somente para teste
    // const init = async()=>{
    //     const db = await conn
    //     await db.run('create table if not exists categorias (id integer primary key, categoria text);') 
    //     await db.run('create table if not exists vagas (id integer primary key, categoria integer, titulo text, descricao text);') 
    
    //     // const vaga = 'Social Media (Brazil)'
    //     // const descricao = 'Vaga2 para Fullstack Developer do Curso Fullstack Lab'
    //     // await db.run(`insert into vagas(categoria, titulo, descricao) values(2, '${vaga}', '${descricao}')`) 
    // }
    // init()
    
    
}

module.exports = init



