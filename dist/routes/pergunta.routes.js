"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pergunta_controller_1 = require("../controllers/pergunta.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
const controller = new pergunta_controller_1.PerguntaController();
// Criar uma nova pergunta (protegida)
router.post("/", auth_middleware_1.default, (req, res) => controller.criar(req, res));
// Listar todas as perguntas (pública)
router.get("/", (req, res) => controller.listar(req, res));
// Buscar uma pergunta por ID (pública)
router.get("/:id", (req, res) => controller.buscarPorId(req, res));
// Deletar uma pergunta por ID (protegida)
router.delete("/:id", auth_middleware_1.default, (req, res) => controller.deletar(req, res));
exports.default = router;
