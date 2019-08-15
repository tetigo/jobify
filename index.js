const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const sqlite = require('sqlite')

const conn = sqlite.open(path.resolve(__dirname,'banco.sqlite'),{Promise})


const port = express.env.PORT || 3000

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
    const categoriasDB = await db.all('select * from categorias;')
    // console.log(categoriasDB)
    const vagas = await db.all('select * from vagas;')
    // console.log(vagas)
    const categorias = categoriasDB.map(cat=>{
        return {
            ...cat,
            vagas: vagas.filter(vaga=> vaga.categoria === cat.id)
        }
    })
    console.log(categorias)
    // console.log(new Date())
    // response.send('<h2>Hi, Fulll</h2>')
    response.locals.href = '/'
    response.render('home', {categorias})
})

app.get('/vaga/:id', async(request, response)=>{
    const id = request.params.id
    const db = await conn
    const vaga = await db.get(`select * from vagas where id = ${id};`)
    // console.log(new Date())
    console.log(vaga)
    console.log(typeof(vaga))
    response.locals.href = '/'
    response.render('vaga',{vaga})
})

app.get('/admin', (req, res)=>{
    res.locals.href = '/'
    res.render('admin/home')
})

app.get('/admin/vagas', async(req, res)=>{
    const db = await conn
    const vagas = await db.all('select * from vagas;')
    res.locals.href = '/admin'
    res.render('admin/vagas',{vagas})
})

app.get('/admin/categorias', async(req,res)=>{
    const db = await conn
    const categorias = await db.all('select * from categorias;')
    res.locals.href = '/admin'
    res.render('admin/categorias',{categorias})
})

app.get('/admin/vagas/delete/:id', async(req,res)=>{
    const id = req.params.id
    const db = await conn
    const test = await db.run(`delete from vagas where id = ${id};`)
    console.log(test)
    res.redirect('/admin/vagas')
})

app.get('/admin/vagas/nova', async(req, res)=>{
    const db = await conn
    const categorias = await db.all('select * from categorias;')
    res.locals.href = '/admin'
    res.render('admin/nova', {categorias})
})

app.post('/admin/vagas/nova', async(req, res)=>{
    // res.send(req.body)
    // console.log(req.body)
    const {tit, desc, cat} = req.body
    console.log(tit, desc, cat)
    // return
    const db = await conn
    const test = await db.run(`insert into vagas(categoria, titulo, descricao) values (${cat},'${tit}', '${desc}');`)
    res.locals.href = '/admin'
    res.redirect('/admin/vagas')
})

app.get('/admin/vagas/edit/:id', async(req, res)=>{
    const id = req.params.id
    const db = await conn
    const categorias = await db.all('select * from categorias;')
    const vaga = await db.get(`select * from vagas where id = ${id}`)
    res.locals.href = '/admin'
    res.render('admin/editar', {categorias, vaga})
})

app.post('/admin/vagas/edit/:id', async(req, res)=>{
    // res.send(req.body)
    const id = req.params.id
    const {tit, desc, cat} = req.body
    // console.log(tit, desc, cat)
    const db = await conn
    const temp = await db.run(`update vagas set titulo='${tit}',descricao='${desc}',categoria=${cat} where id=${id}`)
    res.locals.href = '/admin'
    res.redirect('/admin/vagas')
})

app.get('/admin/categorias/nova', (req, res)=>{
    app.locals.href = '/admin'
    res.render('admin/novac')
})

app.post('/admin/categorias/nova', async(req, res)=>{
    const {cat} = req.body
    const db = await conn
    await db.run(`insert into categorias(categoria) values('${cat}')`)
    res.locals.href='/admin'
    res.redirect('/admin/categorias')
})

app.get('/admin/categorias/delete/:id', async(req, res)=>{
    const id = req.params.id
    // res.send(id)
    const db = await conn
    await db.run(`delete from categorias where id = ${id}`)
    res.locals.href = '/admin'
    res.redirect('/admin/categorias')
})

app.get('/admin/categorias/edit/:id', async(req, res)=>{
    const id = req.params.id
    const db = await conn
    const categoria = await db.get(`select * from categorias where id = ${id}`)
    res.locals.href='/admin'
    res.render('admin/editarc',{categoria})
})

app.post('/admin/categorias/edit/:id', async(req, res)=>{
    const id = req.params.id
    const categoria = req.body.cat
    const db = await conn
    const test = db.run(`update categorias set categoria = '${categoria}' where id = ${id}`)
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




