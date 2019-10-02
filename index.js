const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const process = require('process')

const sqlite = require('sqlite')

const conn = sqlite.open(path.resolve(__dirname,'banco.sqlite'),{Promise})


const categoriasModel = require('./models/categorias')
const vagasModel = require('./models/vagas')

const vagasController = require('./controllers/vagas')
const categoriasController = require('./controllers/categorias')
const adminHomeController = require('./controllers/admin/home')
const adminVagasController = require('./controllers/admin/vagas')
const adminCategoriasController = require('./controllers/admin/categorias')


const categoriasRouter = require('./routes/categorias')
const vagasRouter = require('./routes/vagas')
const adminVagasRouter = require('./routes/admin/vagas')
const adminCategoriasRouter = require('./routes/admin/categorias')

const routes = require('./routes') //arq. index não precisa colocar devido nome ser carregado por padrao

const port = process.env.PORT || 3000


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


// app.use(categoriasRouter(conn))
// app.use(vagasRouter(conn))
// app.use(adminVagasRouter(conn))
// app.use(adminCategoriasRouter(conn))

app.use(routes(conn))

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

app.listen(port, (err)=>{
    if(err){
        console.log('Nao foi possivel iniciar o servidor do Jobify.')
    }else{
        console.log('Servidor do Jobify rodando...')
    }
})




