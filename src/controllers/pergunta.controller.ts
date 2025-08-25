import { Request, Response } from "express";
import { PerguntaService } from "../services/pergunta.service";

const perguntaService = new PerguntaService();

export class PerguntaController {
  // Criar uma nova pergunta
  async criar(req: Request, res: Response) {
    try {
      const { titulo, descricao } = req.body;
      const usuarioId = (req as any).userId;
      const pergunta = await perguntaService.criar(titulo, descricao, usuarioId);
      res.status(201).json(pergunta);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Listar todas as perguntas
  async listar(req: Request, res: Response) {
    try {
      const perguntas = await perguntaService.listar();
      res.json(perguntas);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Buscar pergunta por id
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pergunta = await perguntaService.buscarPorId(Number(id));
      if (!pergunta) {
        return res.status(404).json({ success: false, error: "Pergunta não encontrada" });
      }
      res.json(pergunta);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Deletar pergunta
 async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId!; // garantido pelo authMiddleware

      const resultado = await perguntaService.deletar(Number(id), userId);

      if (!resultado) {
        return res.status(403).json({
          success: false,
          error: 'Você não tem permissão para deletar esta pergunta',
        });
      }

      res.json({ success: true, message: 'Pergunta deletada com sucesso' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
