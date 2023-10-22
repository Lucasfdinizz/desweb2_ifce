const EstandeModel = require('../models/estandeModel');
const CalcularEstandeView = require('../views/calcularEstandeView');
const querystring = require('querystring');
const Task = require('../models/tasks'); 

class CalcularEstandeController {
  constructor() {
    this.model = new EstandeModel();
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
        let area = this.model.calcularArea(lado);
        const isEstandeMedio = area >= 60 && area <= 80;

        const tasks = [];

        const newTask = Task.createTask("Tarefa 1", "Descrição da Tarefa 1");
        tasks.push(newTask);

        const allTasks = Task.listTasks(tasks);

        const html = this.view.render(lado, area, isEstandeMedio, allTasks);
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