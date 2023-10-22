const http = require('http');
const { parse } = require('querystring');
const IndexController = require('./controllers/indexController'); 
const CalcularEstandeController = require('./controllers/calcularEstandeController'); 
const AutorController = require('./controllers/autorController'); 
const PORT = 3000;
const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');

    if (url == '/index') {
        const controller = new IndexController();
        controller.index(req, res);
    } else if (url == '/calcular-estande') {
        const controller = new CalcularEstandeController();
        controller.calcularEstande(req, res);
    } else if (url == '/autor') {
        const controller = new AutorController();
        controller.autor(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><head><meta charset="UTF-8"></head><body><h1>Não encontrado!</h1></body></html>');
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
