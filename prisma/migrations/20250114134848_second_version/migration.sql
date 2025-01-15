/*
  Warnings:

  - A unique constraint covering the columns `[fileName]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "fileName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Game_fileName_key" ON "Game"("fileName");
