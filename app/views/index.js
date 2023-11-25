const Cabecalho = require('./cabecalho');

class Index {
    render() {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
      </head>
          <body>
          ${Cabecalho.render()}          
          <h2>Cálculo da Área de um Estande em forma de Heptadecágono</h2>
          <p><strong>Descrição:</strong></p>
          <p>Calcule a área de um estande em forma de heptadecágono. Se a área estiver dentro do intervalo de 60 a 80 metros quadrados, é um estande médio. Caso contrário, é um estande que não segue o padrão.</p>
          
              <label>
              <span>Nome</span>
              <input id="nome" name="nome" required>
              </label>
              <label>
              <span>Lado do Heptadecágono</span>
              <input type="number" name="lado" id="lado" required>                
              </label>
              <button onclick="calcular()">Calcular</button>
      
              <div class="card">
                 <h2>Ultima resposta</h2>
                 <div id="resposta"></div>
              </div>
              <div class="card">
                  <h2>Respostas anteriores</h2>
                  <div id="historico"></div>
              </div>
          </body>
      </html>
      <script>
          function calcular(){
              let nome = document.getElementById("nome").value.trim()
              let lado = document.getElementById("lado").value.trim()
              if(nome.length == 0){
                  alert("Insira um nome válido")
                  return
              }
              if(lado.length == 0 || lado < 0){
                  alert("Insira um número válido")
                  return
              }
              let resposta = document.getElementById("resposta")
              let area = calcularArea(lado);
              let isEstandeMedio = isMedio(area);
              let text = '<p>Lado do heptadecágono inserido:' + lado + '</p><p>Área do estande: '+ area +'metros quadrados</p>'
              text += isEstandeMedio ? '<p>É um estande médio.</p>' : '<p>É um estande que não segue o padrão.</p>'
              if(resposta.innerHTML.length > 0)
                  salvarHistorico(resposta.innerHTML)
              resposta.innerHTML = text
          }
          function salvarHistorico(text){
              let historico = document.getElementById("historico")
              historico.innerHTML = text + historico.innerHTML 
          }
          function calcularArea(lado) {
              let valor = (17 / 4) * lado * lado * (1 / Math.tan(Math.PI / 17))
              return valor.toFixed(2);
          }
          function isMedio(area) {
              return area >= 60 && area <= 80;
          }
      </script>
      `;
    }
  }
  
  module.exports = Index;