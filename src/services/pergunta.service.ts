import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PerguntaService {
  // Criar uma nova pergunta
  async criar(titulo: string, descricao: string, usuarioId: number) {
    return await prisma.pergunta.create({
      data: {
        titulo,
        descricao,
        usuario: { connect: { id: usuarioId } }, // vincula ao usuário logado
      },
      include: {
        usuario: {
          select: { id: true, nome: true, email: true },
        },
      },
    });
  }

  // Listar todas as perguntas com informações do usuário e respostas
  async listar() {
    return await prisma.pergunta.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        usuario: {
          select: { id: true, nome: true, email: true },
        },
        respostas: {
          include: {
            usuario: {
              select: { id: true, nome: true, role: true },
            },
          },
        },
      },
    });
  }

  // Buscar uma pergunta específica com respostas
  async buscarPorId(id: number) {
    return await prisma.pergunta.findUnique({
      where: { id },
      include: {
        usuario: {
          select: { id: true, nome: true, email: true },
        },
        respostas: {
          include: {
            usuario: {
              select: { id: true, nome: true, role: true },
            },
          },
        },
      },
    });
  }

  // Deletar uma pergunta
  async deletar(id: number, userId: number) {
    const pergunta = await prisma.pergunta.findUnique({ where: { id } });

    if (!pergunta) {
      throw new Error("Pergunta não encontrada");
    }

    if (pergunta.usuarioId !== userId) {
      return null;
    }

    return await prisma.pergunta.delete({ where: { id } });
  }
}
