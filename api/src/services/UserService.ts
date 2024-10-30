import { Prisma, PrismaClient } from "@prisma/client";
import { UserProps } from "../types/UserTypes";
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function getUser(id: string) {
    return await prisma.user.findUnique({ where: { id } });
}

async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
}

async function createUser(data: UserProps) {
    const { name, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await prisma.user.create({ data: { name, email, password: hashedPassword } });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error("O e-mail informado já está cadastrado. Faça login para continuar");
            }
        }
    }
}

module.exports = {
    getUser,
    getUserByEmail,
    createUser
}