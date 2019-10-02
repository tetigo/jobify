
const path = require('path')
const sqlite = require('sqlite')
const conn = sqlite.open(path.resolve(__dirname,'banco.sqlite'),{Promise})
   
const app = require('./app')(conn)

const port = process.env.PORT || 3000


app.listen(port, (err)=>{
    if(err){
        console.log('Nao foi possivel iniciar o servidor do Jobify.')
    }else{
        console.log('Servidor do Jobify rodando...')
    }
})




