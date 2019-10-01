const categoriasModel = require('../models/categorias')
const vagasModel = require('../models/vagas')

const getCategorias = conn => async(request, response)=>{
    const db = await conn
    const categorias = await categoriasModel.getCategorias(db)()
    const vagas = await vagasModel.getVagas(db)()
    const newCategorias = categorias.map(cat=>{
        return {
            ...cat,
            vagas: vagas.filter(vaga=> vaga.categoria === cat.id)
        }
    })
    response.locals.href = '/'
    response.render('home', {categorias:newCategorias})
}

module.exports = {
    getCategorias,
}
