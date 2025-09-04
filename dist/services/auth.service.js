"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = exports.registrarUsuario = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const token_1 = require("../utils/token");
const registrarUsuario = async ({ nome, email, senha }) => {
    // criar hash da senha
    const senhaHash = await (0, token_1.hashSenha)(senha);
    // criar usuário no banco
    const usuario = await client_1.default.usuario.create({
        data: {
            nome,
            email,
            senha: senhaHash,
        },
    });
    // gerar token JWT
    const token = (0, token_1.gerarToken)(usuario.id);
    return { usuario, token };
};
exports.registrarUsuario = registrarUsuario;
const loginUsuario = async ({ email, senha }) => {
    // buscar usuário pelo email
    const usuario = await client_1.default.usuario.findUnique({ where: { email } });
    if (!usuario)
        throw new Error('Usuário não encontrado');
    // validar senha
    const senhaValida = await (0, token_1.compararSenha)(senha, usuario.senha);
    if (!senhaValida)
        throw new Error('Senha incorreta');
    // gerar token JWT
    const token = (0, token_1.gerarToken)(usuario.id);
    return { usuario, token };
};
exports.loginUsuario = loginUsuario;
