/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ALUNO', 'PROFESSOR');

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'ALUNO',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
