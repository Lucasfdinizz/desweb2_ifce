const Cabecalho = require('./cabecalho');

class LoginView {
    render() {
        return `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <script src="/_js/loginScripts.js"></script>
                </head>
                <body>
                    ${Cabecalho.render()}
                    <h1>Login</h1>
                    <form method="post" onSubmit="event.preventDefault(); autenticar();">
                        <div id="resposta"></div>
                        <label>
                            <span>Nome</span>
                            <input id="nome" name="nome">
                        </label>
                        <label>
                            <span>Senha</span>
                            <input id="senha" name="senha" type="password">
                        </label>
                        <button>Ok</button>
                    </form>
                </body>
                </html>
            `
    }
}

module.exports = LoginView

