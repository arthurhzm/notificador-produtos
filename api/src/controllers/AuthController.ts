import { Request, Response } from "express";
import HttpStatusCode from "../contants/HttpStatusCode";
const AuthService = require("../services/AuthService")

export const auth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Email e senha são obrigatórios' });
            return;
        }
        
        await AuthService.auth(email, password);
        res.status(HttpStatusCode.OK).json({ message: "Usuário autenticado com sucesso", data: {} });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}