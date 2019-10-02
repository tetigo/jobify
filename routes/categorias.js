const init = conn => {
    const categoriasController = require('../controllers/categorias')
    const router = require('express').Router()
    router.get('/', categoriasController.getCategorias(conn))

    return router
}


module.exports = init
