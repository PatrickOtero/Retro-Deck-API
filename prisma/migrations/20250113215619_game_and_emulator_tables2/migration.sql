/*
  Warnings:

  - You are about to drop the column `emulatorId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_emulatorId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "emulatorId";
