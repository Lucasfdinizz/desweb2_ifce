const utils = {
    renderizarJSON: function (res, dados, status=200) {
        res.writeHead(status, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(dados));
        res.end();
    },
    decoficarUrl: function (url) {
      let propriedades = url.split('&');
      let query = {};
      for (let propriedade of propriedades) {
          let [ variavel, valor ] = propriedade.split('=');
          query[variavel] = valor;
      }
      return query;
    },
    getBody: function (request) {
        return new Promise((resolve) => {
          let corpoTexto = '';
          request.on('data', function (pedaco) {
              corpoTexto += pedaco;
          });
          request.on('end', () => {
              let corpo = utils.decoficarUrl(corpoTexto);
              resolve(corpo);
          });
        });
    }
}

module.exports = utils;