const init = conn => {
    const router = require('express').Router()
    const adminCategoriasController = require('../../controllers/categorias')
    router.get('/admin/categorias', adminCategoriasController.adminGetCategorias(conn))
    router.get('/admin/categorias/nova', adminCategoriasController.adminInsereCategoria)
    router.post('/admin/categorias/nova', adminCategoriasController.adminInsereCategoria2(conn))
    router.get('/admin/categorias/delete/:id', adminCategoriasController.adminDeleteCategoriaById(conn))
    router.get('/admin/categorias/edit/:id', adminCategoriasController.adminUpdateCategoria(conn))
    router.post('/admin/categorias/edit/:id', adminCategoriasController.adminUpdateCategoria2(conn))
    return router
}

module.exports = init


