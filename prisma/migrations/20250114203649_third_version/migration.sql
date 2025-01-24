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
