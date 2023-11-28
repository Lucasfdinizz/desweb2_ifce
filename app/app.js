const http = require('http');
const { parse } = require('querystring');
const IndexController = require('./controllers/IndexController'); 
const CalcularEstandeController = require('./controllers/CalcularEstandeController'); 
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController'); 
const EstandeController = require('./controllers/EstandesController');
const AuthController = require('./controllers/AuthController');
const UsuarioController = require('./controllers/UsuariosController');
const UsuarioMysqlDao = require('./models/UsuarioMysqlDao'); 
const EstandeMysqlDao = require('./models/EstandeMysqlDao'); 
const PORT = 3000;
const mysql = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'bd',
    user            : process.env.MARIADB_USER,
    password        : process.env.MARIADB_PASSWORD,
    database        : process.env.MARIADB_DATABASE
});

let usuarioDao = new UsuarioMysqlDao(pool);
let estandeDao = new EstandeMysqlDao(pool);
let estandesController = new EstandeController(estandeDao);
let usuarioController = new UsuarioController(usuarioDao);
let authController = new AuthController(usuarioDao);
let estaticoController = new EstaticoController();

const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');
    let urlList = url.split('/');
    url = urlList[1];
    let metodo = req.method
    
    if (url == 'login') {
        authController.index(req, res);
    } 
    else if (url == 'registrar') {
        authController.register(req, res);
    } 
    else if (url == 'autenticar') {
        authController.autenticar(req, res);
    } 
    else if (url == 'index') {
        const controller = new IndexController();
        controller.index(req, res);
    } 
    else if (url == 'calcular-estande') {
        const controller = new CalcularEstandeController();
        controller.calcularEstande(req, res);
    } 
    else if (url == 'autor') {
        const controller = new AutorController();
        controller.autor(req, res);
    } 
    else if (url == 'usuarios' && metodo == 'GET') {
        authController.autorizar(req, res, function() {
            usuarioController.listar(req, res)
        },['Admin']);
    }
    else if (url == 'usuarios' && metodo == 'POST') {
            usuarioController.inserir(req, res);
    }
    else if (url == 'usuarios' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            usuarioController.alterar(req, res);
        },['Admin']);
    }
    else if (url == 'usuarios' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            usuarioController.apagar(req, res);
       },['Admin']);
    } 
    else if (url == 'estandes' && metodo == 'GET') {
        authController.autorizar(req, res, function() {
            estandesController.listar(req, res);
        },['Admin']);
    }
    else if (url == 'estandes' && metodo == 'POST') {
        authController.autorizar(req, res, function() {
            estandesController.inserir(req, res);
        },['Admin']);
    }
    else if (url == 'estandes' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            estandesController.alterar(req, res);
        },['Admin']);
    }
    else if (url == 'estandes' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            estandesController.apagar(req, res);
        },['Admin']);
    } 
    else {
        estaticoController.procurar(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});