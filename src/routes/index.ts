import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.send('API Samind rodando 🚀');
});

// rotas de autenticação
router.use('/auth', authRoutes);

export default router;
