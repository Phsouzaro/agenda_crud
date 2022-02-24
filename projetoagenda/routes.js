const express = require('express')//importa express
const route = express.Router();//importa o gerenciador de rotas do express
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')

/************************************************** */
route.get('/', homeController.index);
/************************************************** */
//rotas de login
route.get('/login/index', loginController.index )
route.get('/login/register', loginController.registerPage )
route.post('/login/login', loginController.login )
route.post('/login/register', loginController.register )
route.get('/login/logout', loginController.logout )




module.exports = route;