/*
  Warnings:

  - You are about to drop the column `ownerId` on the `BookingRec` table. All the data in the column will be lost.
  - Added the required column `BookingId` to the `Attendees` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `owner` on the `Availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `owner` to the `BookingRec` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookingRec" DROP CONSTRAINT "BookingRec_attendeeId_fkey";

-- DropForeignKey
ALTER TABLE "BookingRec" DROP CONSTRAINT "BookingRec_ownerId_fkey";

-- AlterTable
ALTER TABLE "Attendees" ADD COLUMN     "BookingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Availabilities" DROP COLUMN "owner",
ADD COLUMN     "owner" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BookingRec" DROP COLUMN "ownerId",
ADD COLUMN     "attendees" INTEGER[],
ADD COLUMN     "owner" INTEGER NOT NULL;
