"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const pergunta_routes_1 = __importDefault(require("./pergunta.routes"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send('API Samind rodando 🚀');
});
// Rotas de autenticação
router.use('/auth', auth_routes_1.default);
// Rotas de perguntas
router.use('/perguntas', pergunta_routes_1.default);
exports.default = router;
