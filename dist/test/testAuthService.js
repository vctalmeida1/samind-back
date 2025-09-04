"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
async function test() {
    try {
        console.log('--- Registrando usuário ---');
        const registro = await (0, auth_service_1.registrarUsuario)({
            nome: 'Victor Almeida',
            email: 'victor@test.com',
            senha: '123456',
        });
        console.log('Registro:', registro);
        console.log('--- Fazendo login ---');
        const login = await (0, auth_service_1.loginUsuario)({
            email: 'victor@test.com',
            senha: '123456',
        });
        console.log('Login:', login);
        console.log('--- Tentando login com senha errada ---');
        try {
            await (0, auth_service_1.loginUsuario)({
                email: 'victor@test.com',
                senha: 'senhaErrada',
            });
        }
        catch (err) {
            console.log('Erro esperado:', err.message);
        }
    }
    catch (err) {
        console.error('Erro no teste:', err.message);
    }
}
test();
