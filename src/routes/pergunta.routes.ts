import { Router } from "express";
import { PerguntaController } from "../controllers/pergunta.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
const controller = new PerguntaController();

// Criar uma nova pergunta (protegida)
router.post("/", authMiddleware, (req, res) => controller.criar(req, res));

// Listar todas as perguntas (pública)
router.get("/", (req, res) => controller.listar(req, res));

// Buscar uma pergunta por ID (pública)
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

// Deletar uma pergunta por ID (protegida)
router.delete("/:id", authMiddleware, (req, res) => controller.deletar(req, res));

export default router;
