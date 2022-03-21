/*
  Warnings:

  - The primary key for the `Attendees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Attendees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Availabilities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Availabilities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BookingRec` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attendees` on the `BookingRec` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `BookingRec` table. All the data in the column will be lost.
  - The `id` column on the `BookingRec` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Companies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EventsType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EventsType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BookingDoc` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Attendees" DROP CONSTRAINT "Attendees_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Attendees_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Availabilities" DROP CONSTRAINT "Availabilities_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Availabilities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BookingRec" DROP CONSTRAINT "BookingRec_pkey",
DROP COLUMN "attendees",
DROP COLUMN "owner",
ADD COLUMN     "attendeeId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BookingRec_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Companies" DROP CONSTRAINT "Companies_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Companies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EventsType" DROP CONSTRAINT "EventsType_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EventsType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "BookingDoc";

-- AddForeignKey
ALTER TABLE "BookingRec" ADD CONSTRAINT "BookingRec_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRec" ADD CONSTRAINT "BookingRec_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
