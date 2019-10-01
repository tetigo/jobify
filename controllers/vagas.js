const vagasModel = require('../models/vagas')

const getVagaById = conn => async(request, response)=>{
    const id = request.params.id
    const db = await conn
    const vaga = await vagasModel.getVagaById(db)(id)
    response.locals.href = '/'
    response.render('vaga',{vaga})
}

module.exports = {
    getVagaById,
}