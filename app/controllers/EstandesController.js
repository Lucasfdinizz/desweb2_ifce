const Estande = require('../models/Estande');
const EstandeDao = require('../models/EstandeDao');
const utils = require('../helpers/utils')

class EstandeController {

    constructor(estandeDao) {
      this.estandesDao = estandeDao;
    }

    async listar(req, res) {
      let estandes = await this.estandesDao.listar() 
      utils.renderizarJSON(res, estandes)
    }

    async inserir(req, res) {
      try {
          var body = await utils.getBody(req);
          let estande = new Estande(body.lado, body.nome)
          this.estandesDao.inserir(estande);
          utils.renderizarJSON(res,{ 
              list: await this.estandesDao.listar(),
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
        let [ url, queryString ] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        var body = await utils.getBody(req);
        let estande = new Estande(body.lado, body.nome)
        this.estandesDao.alterar(id, estande) 
        utils.renderizarJSON(res,{ 
            list: await this.estandesDao.listar(),
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
        let [ url, queryString ] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        this.estandesDao.apagar(id) 
        utils.renderizarJSON(res,{ 
            list: await this.estandesDao.listar(),
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