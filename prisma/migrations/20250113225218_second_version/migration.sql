-- AlterTable
ALTER TABLE "Game" DROP COLUMN "name",
ADD COLUMN     "gameName" TEXT NOT NULL,
ALTER COLUMN "emulators" SET DEFAULT ARRAY['']::TEXT[];
