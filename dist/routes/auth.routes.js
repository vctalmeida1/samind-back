"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const client_1 = __importDefault(require("../prisma/client"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
// Registro
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const resultado = await (0, auth_service_1.registrarUsuario)({ nome, email, senha });
        return res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso',
            data: resultado,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});
// Login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const resultado = await (0, auth_service_1.loginUsuario)({ email, senha });
        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            data: resultado,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});
// Dados do usuário logado
router.get('/me', auth_middleware_1.default, async (req, res) => {
    try {
        const userId = req.userId;
        const usuario = await client_1.default.usuario.findUnique({ where: { id: userId } });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado',
            });
        }
        // remover senha antes de enviar
        const { senha, ...seguro } = usuario;
        return res.json({
            success: true,
            data: seguro,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Erro ao buscar usuário',
        });
    }
});
exports.default = router;
