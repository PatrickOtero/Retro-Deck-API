/*
  Warnings:

  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - Added the required column `gameName` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "name",
ADD COLUMN     "gameName" TEXT NOT NULL,
ALTER COLUMN "emulators" SET DEFAULT ARRAY['']::TEXT[];
