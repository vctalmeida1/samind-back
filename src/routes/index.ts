import { Router } from 'express';
import authRoutes from './auth.routes';
import perguntaRoutes from './pergunta.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('API Samind rodando 🚀');
});

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de perguntas
router.use('/perguntas', perguntaRoutes);

export default router;
