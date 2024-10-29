import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import HttpStatusCode from "../contants/HttpStatusCode";
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id } });
        res.status(HttpStatusCode.OK).json({ user });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
        res.status(HttpStatusCode.CREATED).json({ user });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


export const getByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        const user = await prisma.user.findUnique({ where: { email } });
        res.status(HttpStatusCode.OK).json({ user });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

