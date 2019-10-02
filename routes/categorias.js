const init = conn => {
    const categoriasController = require('../controllers/categorias')
    const vagasController = require('../controllers/vagas')
    const router = require('express').Router()
    router.get('/', categoriasController.getCategorias(conn))
    router.get('/vaga/:id', vagasController.getVagaById(conn))

    return router
}


module.exports = init
