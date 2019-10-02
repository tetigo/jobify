const init = conn => {
    const router = require('express').Router()
    const adminHomeController = require('../../controllers/admin/home')
    const adminVagasController = require('../../controllers/admin/vagas')
    router.get('/admin', adminHomeController.adminGetHome)
    router.get('/admin/vagas', adminVagasController.adminGetVagas(conn))
    router.get('/admin/vagas/delete/:id', adminVagasController.adminDeleteVagaById(conn))
    router.get('/admin/vagas/nova', adminVagasController.adminInsereVaga(conn))
    router.post('/admin/vagas/nova', adminVagasController.adminInsereVaga2(conn))
    router.get('/admin/vagas/edit/:id', adminVagasController.adminUpdateVaga(conn))
    router.post('/admin/vagas/edit/:id', adminVagasController.adminUpdateVaga2(conn))
    return router
}


module.exports = init

