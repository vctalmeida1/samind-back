import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Garantir tipagem do req.userId (já extendida no routes também)
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido',
      });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: 'Formato do token inválido',
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido ou expirado',
    });
  }
};

export default authMiddleware;
