import { UserProps } from "../types/UserTypes";
const UserService = require('./UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY

const generateToken = (payload: UserProps) => {
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, SECRET_KEY, options);
}

async function auth(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Credenciais inválidas');
    }

    return generateToken(user);
}

module.exports = {
    auth
}