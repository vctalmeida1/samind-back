import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../services/auth.service';
import prisma from '../prisma/client';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Tipagem extra pro Request (melhora o req.userId)
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const resultado = await registrarUsuario({ nome, email, senha });

    return res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      data: resultado,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await loginUsuario({ email, senha });

    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: resultado,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

// Dados do usuário logado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId!;
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado',
      });
    }

    // remover senha antes de enviar
    const { senha, ...seguro } = usuario as any;

    return res.json({
      success: true,
      data: seguro,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar usuário',
    });
  }
});

export default router;
