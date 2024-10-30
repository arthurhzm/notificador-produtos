import { Request, Response } from "express";
import HttpStatusCode from "../contants/HttpStatusCode";
const UserService = require("../services/UserService")

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await UserService.getUser(id);
        res.status(HttpStatusCode.OK).json({ user });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await UserService.createUser(req.body);
        res.status(HttpStatusCode.CREATED).json({ message: "Usuário criado com sucesso", data: {} });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}

