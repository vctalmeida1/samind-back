import { Router } from "express";
import { criarResposta } from "../controllers/respostas.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Criar uma resposta (protegido, precisa estar logado)
router.post("/", authMiddleware, criarResposta);

export default router;
