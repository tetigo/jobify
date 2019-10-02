const init = conn => {
    const vagasController = require('../controllers/vagas')
    const router = require('express').Router()
    router.get('/:id', vagasController.getVagaById(conn))

    return router
}


module.exports = init
