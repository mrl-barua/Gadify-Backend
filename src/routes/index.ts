export function setRoutes(app: any) {
    const IndexController = require('../controllers/index').IndexController;
    const indexController = new IndexController();

    app.get('/', indexController.getIndex.bind(indexController));
}