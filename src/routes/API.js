import express from "express";
import APIController from "../controllers/APIController";
const router = express.Router();

const APIRouter = (app) => {
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user', APIController.createNewUser);
    router.put('/update-user', APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);

    return app.use('/api/v1/', router);
};

export default APIRouter;