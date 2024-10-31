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

        const { token, refreshToken } = await AuthService.auth(email, password);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // Expira em 7 dias
        });

        res.status(HttpStatusCode.OK).json({ message: "Usuário autenticado com sucesso", data: { token } });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Token inválido' });
            return;
        }

        const token = await AuthService.refresh(refreshToken);

        res.status(HttpStatusCode.OK).json({ message: "Token atualizado com sucesso", data: { token } });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}