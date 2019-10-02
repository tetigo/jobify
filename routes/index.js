const categoriasRouter      = require('./categorias')
const vagasRouter           = require('./vagas')
const adminCategoriasRouter = require('./admin/categorias')
const adminVagasRouter      = require('./admin/vagas')
const adminHomeRouter       = require('./admin/home')

const init = conn => {
    const router = require('express').Router()
    
    router.use('/', categoriasRouter(conn))
    router.use('/vaga', vagasRouter(conn))
    router.use('/admin', adminHomeRouter(conn))
    router.use('/admin/vagas', adminVagasRouter(conn))
    router.use('/admin/categorias', adminCategoriasRouter(conn))
    return router
}


module.exports = init
