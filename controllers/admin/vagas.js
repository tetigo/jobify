const vagasModel = require('../../models/vagas')
const categoriasModel = require('../../models/categorias')

const adminGetVagas = conn => async(req, res)=>{
    const db = await conn
    const vagas = await vagasModel.getVagas(db)()
    res.locals.href = '/admin'
    res.render('admin/vagas',{vagas})
}

const adminDeleteVagaById = conn => async(req,res)=>{
    const id = req.params.id
    const db = await conn
    const test = await vagasModel.deleteVagaById(db)(id)
    console.log(test.sql)
    res.redirect('/admin/vagas')
}

const adminInsereVaga = conn => async(req, res)=>{
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)()
    res.locals.href = '/admin'
    res.render('admin/nova', {categorias})
}
const adminInsereVaga2 = conn => async(req, res)=>{
    // res.send(req.body)
    const db = await conn
    const test = await vagasModel.insertNewVaga(db)(req.body)
    res.locals.href = '/admin'
    res.redirect('/admin/vagas')
}

const adminUpdateVaga = conn => async(req, res)=>{
    const id = req.params.id
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)()
    const vaga = await vagasModel.getVagaById(db)(id)
    res.locals.href = '/admin'
    res.render('admin/editar', {categorias, vaga})
}

const adminUpdateVaga2 = conn => async(req, res)=>{
    // res.send(req.body)
    // const id = req.params.id
    // const {tit, desc, cat} = req.body
    const db = await conn
    const obj = {
        ...req.body,
        id: req.params.id
    }
    const temp = await vagasModel.updataVagaById(db)(obj)
    res.locals.href = '/admin'
    res.redirect('/admin/vagas')
}


module.exports = {
    adminGetVagas,
    adminDeleteVagaById,
    adminInsereVaga,
    adminInsereVaga2,
    adminUpdateVaga,
    adminUpdateVaga2,
}


