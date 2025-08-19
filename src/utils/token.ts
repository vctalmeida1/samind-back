import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_temporario';

// gerar hash de senha
export const hashSenha = async (senha: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(senha, salt);
};

// comparar senha
export const compararSenha = async (senha: string, hash: string) => {
  return await bcrypt.compare(senha, hash);
};

// gerar token JWT
export const gerarToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
};
