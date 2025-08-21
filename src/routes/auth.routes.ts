import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../services/auth.service';
import prisma from '../prisma/client';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const resultado = await registrarUsuario({ nome, email, senha });
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await loginUsuario({ email, senha });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Dados do usuário logado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).userId as number;
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const { senha, ...seguro } = usuario as any;
    res.json(seguro);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

export default router;
