// src/controllers/respostas.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma/client";

export const criarResposta = async (req: Request, res: Response) => {
  try {
    const { texto, perguntaId } = req.body;

    // Pegar o usuário logado do JWT
    const usuarioId = req.userId;

    if (!usuarioId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!texto || !perguntaId) {
      return res.status(400).json({ error: "texto e perguntaId são obrigatórios" });
    }

    const resposta = await prisma.resposta.create({
      data: {
        texto,
        perguntaId,
        usuarioId,
      },
      include: {
        usuario: {
          select: {
            nome: true,
            role: true,
          },
        },
      },
    });

    res.status(201).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar resposta" });
  }
};
