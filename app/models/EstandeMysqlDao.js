const Estande = require('./Estande');
const bcrypt = require('bcrypt');

class EstandeMysqlDao {

    constructor(pool) {
        this.pool = pool;
    }

    async listar() {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM Estandes', function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas);
            });
        });
    }

    async inserir(estande) {
        this.validar(estande);
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO Estandes (area, medio) VALUES (?, ?);
            `;
            this.pool.query(sql, [estande.area, estande.medio], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.insertId);
            });
        });
    }

    async alterar(id, estande) {
        if(id == null || id == undefined)
            throw new Error('id_estande_invalido');
        this.validar(estande);
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE Estandes SET area = ?, medio = ? where id = ?;`;
            this.pool.query(sql, [estande.area, estande.medio, id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });

    }

    async apagar(id) {
        if(id == null || id == undefined)
            throw new Error('id_estande_invalido');
        return new Promise((resolve, reject) => {
            let sql = ` Delete from Estandes where id = ?;`;
            this.pool.query(sql, [id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });
    }

    validar(estande) {
        if (estande.area < 0) {
            throw new Error('mensagem_area_invalida');
        }
    }
}

module.exports = EstandeMysqlDao;