class EstandeModel {
    calcularArea(lado) {
        return (17 / 4) * lado * lado * (1 / Math.tan(Math.PI / 17));
    }
}

module.exports = EstandeModel;