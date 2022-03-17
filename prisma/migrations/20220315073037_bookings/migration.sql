/*
  Warnings:

  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `EventsType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `EventsType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventsType" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Events";

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeRange" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "attendees" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "attendeeEmail" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availabilities" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Availabilities_pkey" PRIMARY KEY ("id")
);
