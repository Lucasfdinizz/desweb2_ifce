const IndexView = require('../views/indexView'); 

class IndexController {
    constructor() {
        this.view = new IndexView();
    }

    index(req, res) {
        const html = this.view.render();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }
}

module.exports = IndexController;