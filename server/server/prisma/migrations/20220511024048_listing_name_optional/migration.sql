/*
  Warnings:

  - Made the column `name` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "name" SET NOT NULL;
