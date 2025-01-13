import express from 'express';
import { addUser, getUser, getUsers } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/getUsers', getUsers);
usersRouter.get('/getUser/:id', getUser);
usersRouter.post('/addUser', addUser);

export default usersRouter;