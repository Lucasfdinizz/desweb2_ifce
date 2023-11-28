const Cabecalho = require('./cabecalho');
class Index {
    render() {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <script src="/_js/indexScripts.js"></script>
      </head>
        <body>
        ${Cabecalho.render()}          
        <h2>Cálculo da Área de um Estande em forma de Heptadecágono</h2>
        <p><strong>Descrição:</strong></p>
        <p>Calcule a área de um estande em forma de heptadecágono. Se a área estiver dentro do intervalo de 60 a 80 metros quadrados, é um estande médio. Caso contrário, é um estande que não segue o padrão.</p>
            <div id="feedback">
            </div>
            <form method="post" onSubmit="event.preventDefault(); calcular();">
                <input id="estandeId" name="id" type="hidden">
                <label>
                <span>Nome</span>
                <input id="nome" name="nome" required>
                </label>
                <label>
                <span>Lado do Heptadecágono</span>
                <input type="number" name="lado" id="lado" required>                
                </label>
                <button id="btnSubmit">Calcular</button>
            </form>

            <div class="card">
                <button onclick="listar();">Listar</button>
            </div>
            
            <div class="card">
                <h2>Estandes</h2>
                <table id="historicoTable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Lado</th>
                            <th>Área</th>
                            <th>Médio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="historico">
                    </tbody>
                </table>
            </div>
        </body>
      </html>
      <style>
        .card{
            padding: 10px 0;
        }
        #historicoTable{
            border: 1px solid black;
            min-width: 750px
        }
        #historicoTable tr{
            border: 1px solid
        }
        #historicoTable tr td{
            text-align: center;
            padding: 5px;
        }
        #historicoTable tr th{
            text-align: center;
            width: 20%;
            padding: 5px;
        }
        #feedback{
            padding: 20px 0 20px 0;
        }
        .sucesso{
            color: green;
        }
        .falha{
            color: red;
        }
        table { 
            border-collapse: collapse; 
        }
        
      </style>
      `;
    }
  }
  
  module.exports = Index;