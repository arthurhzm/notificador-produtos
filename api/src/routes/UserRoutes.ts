import { Router } from 'express';
import { createUser, getUser } from '../controllers/UserController';

const UserRouter = Router();

UserRouter.get('/:id', getUser);
UserRouter.post('/', createUser);

export default UserRouter;
