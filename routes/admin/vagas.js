const init = conn => {
    const router = require('express').Router()
    const adminVagasController = require('../../controllers/admin/vagas')
    router.get('/', adminVagasController.adminGetVagas(conn))
    router.get('/delete/:id', adminVagasController.adminDeleteVagaById(conn))
    router.get('/nova', adminVagasController.adminInsereVaga(conn))
    router.post('/nova', adminVagasController.adminInsereVaga2(conn))
    router.get('/edit/:id', adminVagasController.adminUpdateVaga(conn))
    router.post('/edit/:id', adminVagasController.adminUpdateVaga2(conn))
    return router
}


module.exports = init

