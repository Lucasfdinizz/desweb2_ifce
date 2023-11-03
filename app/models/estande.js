class Estande {
    calcularArea(lado) {
        return (17 / 4) * lado * lado * (1 / Math.tan(Math.PI / 17));
    }
    isMedio(area) {
        return area >= 60 && area <= 80;
    }
}

module.exports = Estande;