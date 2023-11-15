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

    async inserir(req, res) {
      try {
          var body = await utils.getBody(req); 
          let estande = new Estande(body.lado)
          this.estandesDao.inserir(estande);
          utils.renderizarJSON(res,{ 
              list: this.estandesDao.listar(),
              mensagem: 'mensagem_estande_cadastrado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async alterar(req, res) {
      
      try {
        var body = await utils.getBody(req);
        let estande = new Estande(body.lado)
        this.estandesDao.alterar(body.id, estande) 
        utils.renderizarJSON(res,{ 
            list: this.estandesDao.listar(),
            mensagem: 'mensagem_estande_alterado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async apagar(req, res){
      try {
        var body = await utils.getBody(req);
        this.estandesDao.apagar(body.id) 
        utils.renderizarJSON(res,{ 
            list: this.estandesDao.listar(),
            mensagem: 'mensagem_estande_excluido'
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