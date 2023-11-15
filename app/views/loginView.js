const Cabecalho = require('./cabecalho');

class LoginView {
    render() {
        return `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    ${Cabecalho.render()}
                    <h1>Login</h1>
                    <form action="autenticar" method="post">
                        <label>
                            <span>Nome</span>
                            <input name="nome">
                        </label>
                        <label>
                            <span>Senha</span>
                            <input name="senha" type="password">
                        </label>
                        <button>Ok</button>
                    </form>
                </body>
                </html>
            `
    }
}

module.exports = LoginView

