require('dotenv').config();//importa o arquivo de configuração e conexao da base de dados
/*********************************************** */
const express = require('express')
const app = express(); //executa o express para ser utilizado
/********************************************* */
const mongoose = require('mongoose')//importa o mongoose
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })//conecta na base de dados
    .then(() => app.emit('pronto'))
    .catch((e) => console.log(`Erro ao conectar a base de dados: ${e}`))
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
/********************************************* */
const routes = require('./routes') //criacao das rotas
const path = require('path'); // importa o path do node
const helmet = require('helmet')
/* const csrf = require('csurf') */
const { middlewareGlobal, chekCsrfErro, csrfMiddleware } = require('./src/middlewares/middleware')
/******************************************** */
app.use(express.urlencoded({ extended: true })) //usado para conseguir acessar os atributos da url
app.use(express.json()) // deixa configurado para dar um Parse.json() nos dados que forem enviados
app.use(express.static(path.resolve(__dirname, 'public')))//usado para setar a pasta estatica do projeto

const sessionOptions = session({
    secret: 'akasdfj0út23453456+54qt23qv qwf qwer qwer qewr asdasdasd a6()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))//usado para setar a pasta views dos arquivos renders
app.set('view engine', 'ejs')//usado para importar a engine de renderizacao como ejs
/************************************** */
app.use(helmet())
/* app.use(csrf()) */
app.use(middlewareGlobal) //usado para definir rota global para nosso servidor
/* app.use(chekCsrfErro)
app.use(csrfMiddleware) */
app.use(routes)//usado para definir as routes
/************************************** */
app.on('pronto', () => app.listen(3000, () => console.log('Servidor rodando na porta 3000, http://127.0.0.1:3000')))
//inicia o servidor na porta 3000
/******************************************** */