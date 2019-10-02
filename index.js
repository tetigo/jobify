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


// app.get('/', categoriasController.getCategorias(conn))
// app.get('/vaga/:id', vagasController.getVagaById(conn))

app.use(categoriasRouter(conn))
app.use(vagasRouter(conn))

// app.get('/admin', adminHomeController.adminGetHome)
// app.get('/admin/vagas', adminVagasController.adminGetVagas(conn))
// app.get('/admin/vagas/delete/:id', adminVagasController.adminDeleteVagaById(conn))
// app.get('/admin/vagas/nova', adminVagasController.adminInsereVaga(conn))
// app.post('/admin/vagas/nova', adminVagasController.adminInsereVaga2(conn))
// app.get('/admin/vagas/edit/:id', adminVagasController.adminUpdateVaga(conn))
// app.post('/admin/vagas/edit/:id', adminVagasController.adminUpdateVaga2(conn))

app.use(adminVagasRouter(conn))

// app.get('/admin/categorias', adminCategoriasController.adminGetCategorias(conn))
// app.get('/admin/categorias/nova', adminCategoriasController.adminInsereCategoria)
// app.post('/admin/categorias/nova', adminCategoriasController.adminInsereCategoria2(conn))
// app.get('/admin/categorias/delete/:id', adminCategoriasController.adminDeleteCategoriaById(conn))
// app.get('/admin/categorias/edit/:id', adminCategoriasController.adminUpdateCategoria(conn))
// app.post('/admin/categorias/edit/:id', adminCategoriasController.adminUpdateCategoria2(conn))

app.use(adminCategoriasRouter(conn))


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




