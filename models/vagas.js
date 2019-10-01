const getVagas = async db => {
    const vagas = await db.all('select * from vagas;')
    return vagas
}

const getVagaById = db => async(id) =>{
    const vaga = await db.get(`select * from vagas where id = ${id};`)
    return vaga
}

const deleteVagaById = db => async(id) =>{
    return await db.run(`delete from vagas where id = ${id};`)
}

const insertNewVaga = db => async({cat, tit, desc}) =>{
    db.run(`insert into vagas(categoria, titulo, descricao) values (${cat},'${tit}', '${desc}');`)
}

const updataVagaById = db => async({tit, desc, cat, id})=>{
    db.run(`update vagas set titulo='${tit}',descricao='${desc}',categoria=${cat} where id=${id}`)
}

module.exports = {
    getVagas,
    getVagaById,
    deleteVagaById,
    insertNewVaga,
    updataVagaById,
}



