const init = conn => {
    const router = require('express').Router()
    const adminHomeController = require('../../controllers/admin/home')
    router.get('/', adminHomeController.adminGetHome)
    return router
}


module.exports = init

