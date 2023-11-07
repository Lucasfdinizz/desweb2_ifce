const http = require('http');
const { parse } = require('querystring');
const IndexController = require('./controllers/IndexController'); 
const CalcularEstandeController = require('./controllers/CalcularEstandeController'); 
const AutorController = require('./controllers/AutorController'); 
const EstandeController = require('./controllers/EstandesController');
const PORT = 3000;

let estandesController = new EstandeController();

const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');
    let metodo = req.method
    
    if (url == '/index') {
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
    else if (url == '/estandes' && metodo == 'GET') {
        estandesController.listar(req, res);
    }
    else if (url == '/estandes' && metodo == 'POST') {
        estandesController.inserir(req, res);
    }
    else if (url == '/estandes' && metodo == 'PUT') {
        estandesController.alterar(req, res);
    }
    else if (url == '/estandes' && metodo == 'DELETE') {
        estandesController.apagar(req, res);
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