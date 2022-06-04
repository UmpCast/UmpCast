/*
  Warnings:

  - The primary key for the `Division` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Listing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserOrganization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserPosition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSeason` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Division" DROP CONSTRAINT "Division_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserPosition" DROP CONSTRAINT "UserPosition_positionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_seasonId_fkey";

-- AlterTable
ALTER TABLE "Division" DROP CONSTRAINT "Division_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "seasonId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Division_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Division_id_seq";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "divisionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Game_id_seq";

-- AlterTable
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "positionId" SET DATA TYPE TEXT,
ALTER COLUMN "gameId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Listing_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Listing_id_seq";

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Organization_id_seq";

-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "divisionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Position_id_seq";

-- AlterTable
ALTER TABLE "Season" DROP CONSTRAINT "Season_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Season_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Season_id_seq";

-- AlterTable
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_pkey",
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserOrganization_id_seq";

-- AlterTable
ALTER TABLE "UserPosition" DROP CONSTRAINT "UserPosition_pkey",
ALTER COLUMN "positionId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPosition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserPosition_id_seq";

-- AlterTable
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_pkey",
ALTER COLUMN "seasonId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserSeason_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserSeason_id_seq";

-- AddForeignKey
ALTER TABLE "UserOrganization" ADD CONSTRAINT "UserOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeason" ADD CONSTRAINT "UserSeason_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPosition" ADD CONSTRAINT "UserPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
