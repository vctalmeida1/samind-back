import prisma from '../prisma/client';
import { hashSenha, compararSenha, gerarToken } from '../utils/token';

interface RegistroInput {
  nome: string;
  email: string;
  senha: string;
}

interface LoginInput {
  email: string;
  senha: string;
}

export const registrarUsuario = async ({ nome, email, senha }: RegistroInput) => {
  // criar hash da senha
  const senhaHash = await hashSenha(senha);

  // criar usuário no banco
  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: senhaHash,
    },
  });

  // gerar token JWT
  const token = gerarToken(usuario.id);

  return { usuario, token };
};

export const loginUsuario = async ({ email, senha }: LoginInput) => {
  // buscar usuário pelo email
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado');

  // validar senha
  const senhaValida = await compararSenha(senha, usuario.senha);
  if (!senhaValida) throw new Error('Senha incorreta');

  // gerar token JWT
  const token = gerarToken(usuario.id);

  return { usuario, token };
};
