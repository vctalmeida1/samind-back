import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_temporario';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Formato do token inválido' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number };
    (req as any).userId = payload.id;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
