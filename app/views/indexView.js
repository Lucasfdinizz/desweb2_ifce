class IndexView {
    render() {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
        </head>
            <body>
            <a href="/index"><button>Início</button></a>
            <h2>Cálculo da Área de um Estande em forma de Heptadecágono</h2>
            <p><strong>Descrição:</strong></p>
            <p>Calcule a área de um estande em forma de heptadecágono. Se a área estiver dentro do intervalo de 60 a 80 metros quadrados, é um estande médio. Caso contrário, é um estande que não segue o padrão.</p>
            <form action="calcular-estande" method="post">
                <label>
                <span>Lado do Heptadecágono</span>
                <input type="number" name="lado" required> <!-- Adicionado o atributo required -->                </label>
                <button>Calcular</button>
            </form>
            <h4><footer>Desenvolvido por <a href="/autor">Lucas Diniz</a></footer><h4>
            </body>
        </html>
      `;
    }
  }
  
  module.exports = IndexView;