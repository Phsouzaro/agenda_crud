const express = require('express')//importa express
const route = express.Router();//importa o gerenciador de rotas do express
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const { loginRequired } = require('./src/middlewares/middleware')

/************************************************** */
route.get('/', homeController.index);
/************************************************** */
//rotas de login
route.get('/login/index', loginController.index )
route.get('/login/register', loginController.registerPage )
route.post('/login/login', loginController.login )
route.post('/login/register', loginController.register )
route.get('/login/logout', loginController.logout )
//Rotas de Contato
route.get('/contatos/index', loginRequired, contatoController.index )
route.post('/contatos/register', loginRequired, contatoController.register )
route.get('/contatos/index/:id=?', loginRequired, contatoController.editIndex )
route.post('/contatos/edit/:id=?', loginRequired, contatoController.edit)
route.get('/contatos/delete/:id=?', loginRequired, contatoController.delete)







module.exports = route;