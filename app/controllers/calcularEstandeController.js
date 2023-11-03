const Estande = require('../models/estande');
const CalcularEstandeView = require('../views/calcularEstandeView');
const querystring = require('querystring');

class CalcularEstandeController {
  constructor() {
    this.estande = new Estande(); 
    this.view = new CalcularEstandeView();
  }

  calcularEstande(req, res) {
    if (req.method === 'POST') {
      let corpoTexto = '';
      req.on('data', function (pedaco) {
        corpoTexto += pedaco;
      });

      req.on('end', () => {
        const dadosDoFormulario = querystring.parse(corpoTexto);
        let lado = parseFloat(dadosDoFormulario.lado);
        let area = this.estande.calcularArea(lado);
        let isEstandeMedio = this.estande.isMedio(area);

        const html = this.view.render(lado, area, isEstandeMedio);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
      });
    } else {
      res.writeHead(405, { 'Content-Type': 'text/html' });
      res.write('<h1>Método não permitido</h1>');
      res.end();
    }
  }
}

module.exports = CalcularEstandeController;