/*
  Warnings:

  - The primary key for the `SignUp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserOrganization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserPosition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSeason` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,positionId,gameId]` on the table `SignUp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,organizationId]` on the table `UserOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,positionId]` on the table `UserPosition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,seasonId]` on the table `UserSeason` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SignUp" DROP CONSTRAINT "SignUp_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SignUp_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserPosition" DROP CONSTRAINT "UserPosition_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserPosition_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserSeason_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "SignUp_userId_positionId_gameId_key" ON "SignUp"("userId", "positionId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_userId_organizationId_key" ON "UserOrganization"("userId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPosition_userId_positionId_key" ON "UserPosition"("userId", "positionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeason_userId_seasonId_key" ON "UserSeason"("userId", "seasonId");
