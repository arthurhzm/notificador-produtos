import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    return res.json(user);
}
