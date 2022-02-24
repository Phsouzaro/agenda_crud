const validator = require('validator')
const bcryptjs = require('bcryptjs')
/******************************************************* */
const mongoose = require('mongoose')
/******************************************************* */
const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
})
/******************************************************* */
const LoginModel = mongoose.model('Login', LoginSchema)
/******************************************************* */
class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }
    async login(){
        this.valida()
        if(this.errors.length > 0) return;
        this.user =   await LoginModel.findOne({ email: this.body.email })
        if(!this.user) {
            this.errors.push('Usuario inválidos')
            return
        }
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha Inválida')
            this.user = null
            return
        }
    }
    async register(){
        this.valida()
        if(this.errors.length > 0) return;
        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)
    
    }
    valida(){
        this.cleanUp()
        if(!validator.isEmail(this.body.email)) this.errors.push('Email Invalido')//o email precisa ser valido
        if(this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres.') //a senha precisa ter entre 3 e 50
    }
    cleanUp(){
        for(const key in this.body) if (typeof this.body[key] !== 'string') this.body[key] = ''
        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            email: this.body.email,
            password: this.body.password
        }
    }
    async userExists(){
       const user =   await LoginModel.findOne({ email: this.body.email })
       if(user) {
           this.errors.push('Endereço de E-mail já encontrado na base de dados')
       }
    }
}
/******************************************************* */

module.exports = Login