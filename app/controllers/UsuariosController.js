const Usuario = require('../models/Usuario');
const utils = require('../helpers/utils')

class UsuariosController {

    constructor(usuarioDao) {
      this.usuariosDao = usuarioDao;
    }

    listar(req, res) {
      let usuarios = this.usuariosDao.listar()
      utils.renderizarJSON(res, usuarios)
    }

    async inserir(req, res) {
      try {
          var body = await utils.getBody(req); 
          let usuario = new Usuario(body.nome, body.senha)
          this.usuariosDao.inserir(usuario);
          utils.renderizarJSON(res,{ 
              list: this.usuariosDao.listar(),
              mensagem: 'mensagem_usuario_cadastrado'
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
        let usuario = new Usuario(body.nome, body.senha)
        this.usuariosDao.alterar(body.id, usuario) 
        utils.renderizarJSON(res,{ 
            list: this.usuariosDao.listar(),
            mensagem: 'mensagem_usuario_alterado'
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
        this.usuariosDao.apagar(body.id) 
        utils.renderizarJSON(res,{ 
            list: this.usuariosDao.listar(),
            mensagem: 'mensagem_usuario_excluido'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }
}

module.exports = UsuariosController