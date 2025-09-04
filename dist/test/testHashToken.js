"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../utils/token");
async function test() {
    const senha = '123456';
    // criar hash
    const hash = await (0, token_1.hashSenha)(senha);
    console.log('Hash gerado:', hash);
    // comparar senha correta
    const check1 = await (0, token_1.compararSenha)(senha, hash);
    console.log('Senha correta bate?', check1); // true
    // comparar senha incorreta
    const check2 = await (0, token_1.compararSenha)('senhaErrada', hash);
    console.log('Senha incorreta bate?', check2); // false
    // gerar token
    const token = (0, token_1.gerarToken)(1); // id do usuário fictício
    console.log('Token JWT:', token);
}
test();
// resultado esperado
// Hash gerado: $2a$10$...
// Senha correta bate? true
// Senha incorreta bate? false
// Token JWT: eyJhbGciOi...
