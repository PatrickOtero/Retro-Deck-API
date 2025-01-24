-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "fileName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Game_fileName_key" ON "Game"("fileName");
