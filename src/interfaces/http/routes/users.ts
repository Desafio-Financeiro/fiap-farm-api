import { Router } from 'express';
import UserController from '@/interfaces/http/controllers/UserController';
import authenticateFirebase from '@/interfaces/http/middleware/authFirebase';

const usersRouter = Router();

usersRouter.get('/', authenticateFirebase, async (_req, res, next) => {
  try {
    const users = await UserController.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
