const utils = {
    renderizarJSON: function (res, dados, status=200) {
        res.writeHead(status, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(dados));
        res.end();
    },
    getBody: function (request) {
        return new Promise((resolve) => {
          const bodyParts = [];
          let body;
          request.on('data', (chunk) => {
            bodyParts.push(chunk);
          }).on('end', () => {
            body = JSON.parse(Buffer.concat(bodyParts).toString());
            resolve(body)
          });
        });
    }
}

module.exports = utils;