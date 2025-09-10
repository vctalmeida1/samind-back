// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10);

  const professor = await prisma.usuario.upsert({
    where: { email: "prof@test.com" },
    update: {},
    create: {
      nome: "Professor Teste",
      email: "prof@test.com",
      senha: senhaHash,
      role: "PROFESSOR",
    },
  });

  console.log("Professor criado ou já existente:", professor);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
