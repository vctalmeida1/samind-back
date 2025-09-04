"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerguntaController = void 0;
const pergunta_service_1 = require("../services/pergunta.service");
const perguntaService = new pergunta_service_1.PerguntaService();
class PerguntaController {
    // Criar uma nova pergunta
    async criar(req, res) {
        try {
            const { titulo, descricao } = req.body;
            const usuarioId = req.userId;
            const pergunta = await perguntaService.criar(titulo, descricao, usuarioId);
            res.status(201).json(pergunta);
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    // Listar todas as perguntas
    async listar(req, res) {
        try {
            const perguntas = await perguntaService.listar();
            res.json(perguntas);
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    // Buscar pergunta por id
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const pergunta = await perguntaService.buscarPorId(Number(id));
            if (!pergunta) {
                return res.status(404).json({ success: false, error: "Pergunta não encontrada" });
            }
            res.json(pergunta);
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    // Deletar pergunta
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId; // garantido pelo authMiddleware
            const resultado = await perguntaService.deletar(Number(id), userId);
            if (!resultado) {
                return res.status(403).json({
                    success: false,
                    error: 'Você não tem permissão para deletar esta pergunta',
                });
            }
            res.json({ success: true, message: 'Pergunta deletada com sucesso' });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
exports.PerguntaController = PerguntaController;
