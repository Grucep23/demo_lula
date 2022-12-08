import express from "express";
import homeController from '../controllers/homeController';
const router = express.Router();

const webRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detailUser/:id', homeController.getDetailUser);
    router.post('/create-new-user', homeController.createNewUser);
    return app.use('/', router);
};

export default webRouter;