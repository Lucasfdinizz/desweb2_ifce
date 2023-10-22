class AutorView {
    render() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
                <body>
                    <a href="/index"><button>Início</button></a>
                    <h2>Autor</h2>
                    <ul>
                        <li>Lucas de França Diniz</li>
                    </ul>
                        <h2>Formações Acadêmicas</h2>
                    <ul>
                        <li>Análise e desenvolvimento de sistemas (Cursando)</li>
                        <li>Instituição: Universidade Estácio De Sá</li>
                        <li>Técnico em Informática para Internet (Cursando)</li>
                        <li>Instituição: Instituto Federal do Ceará (IFCE)</li>
                    </ul>
                    <h2>Experiências Profissionais</h2>
                    <ul>
                        <li>Função: 3º Sgt</li>
                        <li>Empresa: Exército Brasileiro</li>
                        <li>Ano início: 2016</li>
                    </ul>
                </body>
            </html>
        `;
    }
}

module.exports = AutorView;