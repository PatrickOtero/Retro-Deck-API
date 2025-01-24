-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_emulatorId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "emulatorId";
