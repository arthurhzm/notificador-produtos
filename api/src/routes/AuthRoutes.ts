import { Router } from "express";
import { auth } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post('/', auth)

export default AuthRouter;