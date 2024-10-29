import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import HttpStatusCode from "../contants/HttpStatusCode";
const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    return res.status(HttpStatusCode.OK).json(user);
}
