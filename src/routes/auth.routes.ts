import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../services/auth.service';

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

export default router;
