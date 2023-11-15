const Cabecalho = require('./cabecalho');
const ExperienciaView = require('./experienciaView');
const FormacaoView = require('./formacaoView');

class Autor {
    render() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
                <body>
                    ${Cabecalho.render()}                   
                    <h2>Autor</h2>
                    <ul>
                        <li>Lucas de França Diniz</li>
                    </ul>
                    <h2>Formações Acadêmicas</h2>
                    ${FormacaoView.render()} 
                    <h2>Experiências Profissionais</h2>
                    ${ExperienciaView.render()} 
                </body>
            </html>
        `;
    }
}

module.exports = Autor;