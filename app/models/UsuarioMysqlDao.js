const Usuario = require('./Usuario');
const bcrypt = require('bcrypt');

class UsuarioMysqlDao {

    constructor(pool) {
        this.pool = pool;
    }

    async listar() {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM Usuarios', function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas);
            });
        });
    }

    async inserir(usuario) {
        this.validar(usuario);
        usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO Usuarios (nome, senha, id_papel) VALUES (?, ?, ?);
            `;
            this.pool.query(sql, [usuario.nome, usuario.senha, 1], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.insertId);
            });
        });
    }

    async alterar(id, usuario) {
        if(id == null || id == undefined)
            throw new Error('id_usuario_invalido');
        this.validar(usuario);
        usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE Usuarios SET nome = ?, senha = ? where id = ?;`;
            this.pool.query(sql, [usuario.nome, usuario.senha, id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });

    }

    async apagar(id) {
        if(id == null || id == undefined)
            throw new Error('id_usuario_invalido');
        return new Promise((resolve, reject) => {
            let sql = ` Delete from Usuarios where id = ?;`;
            this.pool.query(sql, [id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });
    }

    validar(usuario) {
        if (!usuario.nome) {
            throw new Error('mensagem_nome_invalido');
        }
        if (!usuario.senha) {
            throw new Error('mensagem_senha_invalido');
        }
    }
    autenticar(nome, senha) {
        for (let usuario of this.listar()) {
            
            if (usuario.nome?.toLowerCase() == nome?.toLowerCase() && bcrypt.compareSync(senha, usuario.senha)) {
                return usuario;
            }
        }
        return null;
    }
}

module.exports = UsuarioMysqlDao;