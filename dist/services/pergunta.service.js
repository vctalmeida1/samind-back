"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerguntaService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PerguntaService {
    // Criar uma nova pergunta
    async criar(titulo, descricao, usuarioId) {
        return await prisma.pergunta.create({
            data: {
                titulo,
                descricao,
                usuario: {
                    connect: { id: usuarioId }, // vincula ao usuário logado
                },
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    }
    // Listar todas as perguntas com informações do usuário
    async listar() {
        return await prisma.pergunta.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    }
    // Buscar uma pergunta específica
    async buscarPorId(id) {
        return await prisma.pergunta.findUnique({
            where: { id },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    }
    // Deletar uma pergunta
    async deletar(id, userId) {
        // buscar a pergunta
        const pergunta = await prisma.pergunta.findUnique({ where: { id } });
        if (!pergunta) {
            throw new Error('Pergunta não encontrada');
        }
        // checar se o usuário é dono
        if (pergunta.usuarioId !== userId) {
            return null; // ou lançar erro, dependendo do que você quer
        }
        return await prisma.pergunta.delete({ where: { id } });
    }
}
exports.PerguntaService = PerguntaService;
