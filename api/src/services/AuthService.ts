import { UserProps } from "../types/UserTypes";
const UserService = require('./UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY

const generateToken = (payload: UserProps) => {
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, SECRET_KEY, options);
}

const generateRefreshToken = (payload: UserProps) => {
    const options = {
        expiresIn: '7d'
    }

    return jwt.sign(payload, REFRESH_SECRET_KEY, options);
}

const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
}

const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET_KEY);
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

    const refreshToken = await generateRefreshToken(user);
    const token = generateToken(user);
    return { token, refreshToken };
}

async function refresh(token: string) {
    const payload = verifyRefreshToken(token);
    const { exp, ...userPayload } = payload;
    return generateToken(userPayload);
}

module.exports = {
    auth,
    refresh,
    verifyRefreshToken
}