const UserService = require('./UserService');
const bcrypt = require('bcrypt');

async function auth(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Credenciais inválidas');
    }

}

module.exports = {
    auth
}