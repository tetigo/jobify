const categoriasModel = require('../../models/categorias')

const adminGetCategorias = conn => async(req,res)=>{
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)()
    res.locals.href = '/admin'
    res.render('admin/categorias',{categorias})
}

const adminInsereCategoria = (req, res)=>{
    res.locals.href = '/admin'
    res.render('admin/novac')
}

const adminInsereCategoria2 = conn => async(req, res)=>{
    // const {cat} = req.body
    const db = await conn
    const nada = await categoriasModel.insertNewCategoria(db)(req.body)
    res.locals.href='/admin'
    res.redirect('/admin/categorias')
}
const adminDeleteCategoriaById = conn => async(req, res)=>{
    // res.send(id)
    const db = await conn
    const nada = await categoriasModel.deleteCategoriaById(db)(req.params.id)
    res.locals.href = '/admin'
    res.redirect('/admin/categorias')
}

const adminUpdateCategoria = conn => async(req, res)=>{
    const db = await conn
    const categoria = await categoriasModel.getCategoriaById(db)(req.params.id)
    res.locals.href='/admin'
    res.render('admin/editarc',{categoria})
}

const adminUpdateCategoria2 = conn => async(req, res)=>{
    const obj = {
        categoria: req.body.cat,
        id: req.params.id
    }
    const db = await conn
    const test = await categoriasModel.updateCategoriaById(db)(obj)
    res.locals.href='/admin'
    res.redirect('/admin/categorias')
}

module.exports = {
    adminGetCategorias,
    adminInsereCategoria,
    adminInsereCategoria2,
    adminDeleteCategoriaById,
    adminUpdateCategoria,
    adminUpdateCategoria2,
}

