exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next();
}
exports.outroMiddleware = (req, res, next) => {
    next();
}
/* exports.chekCsrfErro = (erro, req, res, next) =>{
    console.log(erro.code)
    if(erro) {
        return res.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
} */