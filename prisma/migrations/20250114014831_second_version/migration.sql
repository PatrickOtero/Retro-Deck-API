/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Emulator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gameName]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emulator_name_key" ON "Emulator"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameName_key" ON "Game"("gameName");
