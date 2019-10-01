const adminGetHome = (req, res)=>{
    res.locals.href = '/'
    res.render('admin/home')
}


module.exports = {
    adminGetHome
}