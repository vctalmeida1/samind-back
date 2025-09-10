import { Router } from 'express';
import authRoutes from './auth.routes';
import perguntaRoutes from './pergunta.routes';
import respostaRoutes from './respostas.routes'; // importar rotas de respostas

const router = Router();

router.get('/', (_req, res) => {
  res.send('API Samind rodando 🚀');
});

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de perguntas
router.use('/perguntas', perguntaRoutes);

// Rotas de respostas
router.use('/respostas', respostaRoutes);

export default router;
