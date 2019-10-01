const getCategorias = async db => {
    const categorias = await db.all('select * from categorias;')
    return categorias
}

const getCategoriaById = db => async(id) =>{
    const categoria = await db.get(`select * from categorias where id = ${id}`)
    return categoria
}

const insertNewCategoria = db => async({cat}) => {
    return await db.run(`insert into categorias(categoria) values('${cat}')`)
}

const deleteCategoriaById = db => async(id) =>{
    return await db.run(`delete from categorias where id = ${id}`)
}

const updateCategoriaById = db => async({categoria, id}) => {
    return await db.run(`update categorias set categoria = '${categoria}' where id = ${id}`)
}

module.exports = {
    getCategorias,
    getCategoriaById,
    insertNewCategoria,
    deleteCategoriaById,
    updateCategoriaById,
}



