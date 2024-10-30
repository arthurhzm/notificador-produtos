import { Router } from "express";
import { auth, refresh } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post('/', auth);
AuthRouter.post('/refresh', refresh);

export default AuthRouter;