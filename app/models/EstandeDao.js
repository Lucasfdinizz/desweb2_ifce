class EstandeDao {
    constructor() {
        this.estandes = [];
    }

    listar() {
        return this.estandes;
    }

    inserir(estande) {
        this.validar(estande);
        this.estandes.push(estande);
    }

    alterar(id, estande) {
        this.validar(estande);
        this.estandes[id] = estande;
    }

    apagar(id) {
        this.estandes.splice(id, 1);
    }

    validar(estande) {
        if (estande.area < 0) {
            throw new Error('mensagem_area_invalida');
        }
    }
}

module.exports = EstandeDao;