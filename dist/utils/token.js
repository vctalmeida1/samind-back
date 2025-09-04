"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarToken = exports.compararSenha = exports.hashSenha = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_temporario';
// gerar hash de senha
const hashSenha = async (senha) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(senha, salt);
};
exports.hashSenha = hashSenha;
// comparar senha
const compararSenha = async (senha, hash) => {
    return await bcryptjs_1.default.compare(senha, hash);
};
exports.compararSenha = compararSenha;
// gerar token JWT
const gerarToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
};
exports.gerarToken = gerarToken;
