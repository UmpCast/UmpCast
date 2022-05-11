/*
  Warnings:

  - A unique constraint covering the columns `[positionId,gameId]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Listing_userId_positionId_gameId_key";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "name" TEXT,
ALTER COLUMN "positionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Listing_positionId_gameId_key" ON "Listing"("positionId", "gameId");
