/*
  Warnings:

  - Added the required column `status` to the `BookRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookRecord" ADD COLUMN     "status" TEXT NOT NULL;
