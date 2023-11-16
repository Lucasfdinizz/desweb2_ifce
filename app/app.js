const http = require('http');
require('dotenv').config();
const { parse } = require('querystring');
const IndexController = require('./controllers/IndexController'); 
const CalcularEstandeController = require('./controllers/CalcularEstandeController'); 
const AutorController = require('./controllers/AutorController'); 
const EstandeController = require('./controllers/EstandesController');
const AuthController = require('./controllers/AuthController');
const UsuarioController = require('./controllers/UsuariosController');
const UsuarioDao = require('./models/UsuarioDao'); 
const PORT = 3000;
const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'bd',
  user            : 'admin',
  password        : 'admin',
  database        : 'desweb2_ifce'
});

let usuarioDao = new UsuarioDao();
let estandesController = new EstandeController();
let usuarioController = new UsuarioController(usuarioDao);
let authController = new AuthController(usuarioDao);

const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');
    let metodo = req.method
    
    if (url == '/login') {
        authController.index(req, res);
    } 
    else if (url == '/registrar') {
        authController.register(req, res);
    } 
    else if (url == '/autenticar') {
        authController.autenticar(req, res);
    } 
    else if (url == '/index') {
        const controller = new IndexController();
        controller.index(req, res);
    } 
    else if (url == '/calcular-estande') {
        const controller = new CalcularEstandeController();
        controller.calcularEstande(req, res);
    } 
    else if (url == '/autor') {
        const controller = new AutorController();
        controller.autor(req, res);
    } 
    else if (url == '/usuarios' && metodo == 'GET') {
        authController.autorizar(req, res, function() {
            usuarioController.listar(req, res)
        },['admin']);
    }
    else if (url == '/usuarios' && metodo == 'POST') {
            usuarioController.inserir(req, res);
    }
    else if (url == '/usuarios' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            usuarioController.alterar(req, res);
        },['admin']);
    }
    else if (url == '/usuarios' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            usuarioController.apagar(req, res);
        },['admin']);
    } 
    else if (url == '/estandes' && metodo == 'GET') {
        estandesController.listar(req, res);
    }
    else if (url == '/estandes' && metodo == 'POST') {
        authController.autorizar(req, res, function() {
            estandesController.inserir(req, res);
        },['admin']);
    }
    else if (url == '/estandes' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            estandesController.alterar(req, res);
        },['admin']);
    }
    else if (url == '/estandes' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            estandesController.apagar(req, res);
        },['admin']);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><head><meta charset="UTF-8"></head><body><h1>Não encontrado!</h1></body></html>');
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});