const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const sqlite = require('sqlite')

const conn = sqlite.open(path.resolve(__dirname,'banco.sqlite'),{Promise})
const process = require('process')


const categoriasModel = require('./models/categorias')
const vagasModel = require('./models/vagas')

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

app.get('/', async(request, response)=>{
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)
    const vagas = await vagasModel.getVagas(db)
    const newCategorias = categorias.map(cat=>{
        return {
            ...cat,
            vagas: vagas.filter(vaga=> vaga.categoria === cat.id)
        }
    })
    response.locals.href = '/'
    response.render('home', {categorias:newCategorias})
})

app.get('/vaga/:id', async(request, response)=>{
    const id = request.params.id
    const db = await conn
    const vaga = await vagasModel.getVagaById(db)(id)
    response.locals.href = '/'
    response.render('vaga',{vaga})
})

app.get('/admin', (req, res)=>{
    res.locals.href = '/'
    res.render('admin/home')
})

app.get('/admin/vagas', async(req, res)=>{
    const db = await conn
    // const vagas = await db.all('select * from vagas;')
    const vagas = await vagasModel.getVagas(db)
    res.locals.href = '/admin'
    res.render('admin/vagas',{vagas})
})

app.get('/admin/categorias', async(req,res)=>{
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)
    res.locals.href = '/admin'
    res.render('admin/categorias',{categorias})
})

app.get('/admin/vagas/delete/:id', async(req,res)=>{
    const id = req.params.id
    const db = await conn
    const test = await vagasModel.deleteVagaById(db)(id)
    console.log(test)
    res.redirect('/admin/vagas')
})

app.get('/admin/vagas/nova', async(req, res)=>{
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)
    res.locals.href = '/admin'
    res.render('admin/nova', {categorias})
})

app.post('/admin/vagas/nova', async(req, res)=>{
    // res.send(req.body)
    const db = await conn
    const test = await vagasModel.insertNewVaga(db)(req.body)
    res.locals.href = '/admin'
    res.redirect('/admin/vagas')
})

app.get('/admin/vagas/edit/:id', async(req, res)=>{
    const id = req.params.id
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)
    const vaga = await vagasModel.getVagaById(db)(id)
    res.locals.href = '/admin'
    res.render('admin/editar', {categorias, vaga})
})

app.post('/admin/vagas/edit/:id', async(req, res)=>{
    // res.send(req.body)
    // const id = req.params.id
    // const {tit, desc, cat} = req.body
    const obj = {
        ...req.body,
        id: req.params.id
    }
    const db = await conn
    const temp = await vagasModel.updataVagaById(db)(obj)
    res.locals.href = '/admin'
    res.redirect('/admin/vagas')
})

app.get('/admin/categorias/nova', (req, res)=>{
    app.locals.href = '/admin'
    res.render('admin/novac')
})

app.post('/admin/categorias/nova', async(req, res)=>{
    // const {cat} = req.body
    const db = await conn
    const nada = await categoriasModel.insertNewCategoria(db)(req.body)
    res.locals.href='/admin'
    res.redirect('/admin/categorias')
})

app.get('/admin/categorias/delete/:id', async(req, res)=>{
    // res.send(id)
    const db = await conn
    const nada = await categoriasModel.deleteCategoriaById(db)(req.params.id)
    res.locals.href = '/admin'
    res.redirect('/admin/categorias')
})

app.get('/admin/categorias/edit/:id', async(req, res)=>{
    const db = await conn
    const categoria = await categoriasModel.getCategoriaById(db)(req.params.id)
    res.locals.href='/admin'
    res.render('admin/editarc',{categoria})
})

app.post('/admin/categorias/edit/:id', async(req, res)=>{
    const obj = {
        categoria: req.body.cat,
        id: req.params.id
    }
    const db = await conn
    const test = await categoriasModel.updateCategoriaById(db)(obj)
    res.locals.href='/admin'
    res.redirect('/admin/categorias')
})

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




