class Estande {
    constructor(lado) {
        this.validar(lado)
        this.area = this.calcularArea(lado)
        this.medio = this.isMedio(this.area)
    }
    calcularArea(lado) {
        let valor = (17 / 4) * lado * lado * (1 / Math.tan(Math.PI / 17))
        return valor.toFixed(2);
    }
    isMedio(area) {
        return area >= 60 && area <= 80;
    }
    validar(lado) {
        if (lado < 0 || lado == undefined || lado == "") {
            throw new Error('mensagem_lado_invalida');
        }
    }
}

module.exports = Estande;