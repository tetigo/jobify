const init = conn => {
    const router = require('express').Router()
    const adminCategoriasController = require('../../controllers/admin/categorias')
    router.get('/', adminCategoriasController.adminGetCategorias(conn))
    router.get('/nova', adminCategoriasController.adminInsereCategoria)
    router.post('/nova', adminCategoriasController.adminInsereCategoria2(conn))
    router.get('/delete/:id', adminCategoriasController.adminDeleteCategoriaById(conn))
    router.get('/edit/:id', adminCategoriasController.adminUpdateCategoria(conn))
    router.post('/edit/:id', adminCategoriasController.adminUpdateCategoria2(conn))
    return router
}

module.exports = init


