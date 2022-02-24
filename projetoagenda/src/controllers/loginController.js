
const Login = require('../models/loginModel')
exports.index = (req, res, next) => {
    if(req.session.user) return res.render('login-logado')
    return res.render('login')
}
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () { return res.redirect('/login/register'); });
            return;
        }
     
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function () { return res.redirect('/login/index'); });
     }  catch(e) { return res.render('404'); }
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () { return res.redirect('/login/index'); });
            return;
        }
        
     
        req.flash('success', 'Usuário logado com sucesso');
        req.session.user = login.user
        req.session.save(function () { return res.redirect('/login/index'); });
     }  catch(e) { return res.render('404'); }
}
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}
exports.registerPage = (req, res) => {
    res.render('register')
}