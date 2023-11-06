const Estande = require('../models/Estande');
const EstandeDao = require('../models/EstandeDao');
const utils = require('../helpers/utils')

class EstandeController {
    constructor() {
      this.estandesDao = new EstandeDao();
    }
    listar(req, res) {
      let estandes = this.estandesDao.listar()
      utils.renderizarJSON(res, estandes)
    }
    inserir(req, res) {
      try {
          console.log(req)
          let estande = new Estande(req.lado)
          this.estandesDao.inserir(estande);
          utils.renderizarJSON(res,{ list:this.estandesDao.listar(),
              mensagem: 'mensagem_estande_cadastrado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
  }
}

module.exports = EstandeController