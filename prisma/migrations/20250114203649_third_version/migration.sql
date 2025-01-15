/*
  Warnings:

  - You are about to drop the column `console` on the `Emulator` table. All the data in the column will be lost.
  - You are about to drop the column `extensions` on the `Emulator` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Emulator` table. All the data in the column will be lost.
  - You are about to drop the column `emulators` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emulatorName]` on the table `Emulator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emulatorName` to the `Emulator` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Emulator_name_key";

-- AlterTable
ALTER TABLE "Emulator" DROP COLUMN "console",
DROP COLUMN "extensions",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emulatorName" TEXT NOT NULL,
ADD COLUMN     "romExtensions" TEXT[] DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "emulators";

-- CreateIndex
CREATE UNIQUE INDEX "Emulator_emulatorName_key" ON "Emulator"("emulatorName");
