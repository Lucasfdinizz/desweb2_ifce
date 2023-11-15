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
        if(id == null || id == undefined || this.estandes[id] == undefined)
            throw new Error('id_estande_invalido');
        this.validar(estande);
        this.estandes[id] = estande;
    }

    apagar(id) {
        if(id == null || id == undefined || this.estandes[id] == undefined)
            throw new Error('id_estande_invalido');
        this.estandes.splice(id, 1);
    }

    validar(estande) {
        if (estande.area < 0) {
            throw new Error('mensagem_area_invalida');
        }
    }
}

module.exports = EstandeDao;