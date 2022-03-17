/*
  Warnings:

  - You are about to drop the `BookRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BookRecord";

-- CreateTable
CREATE TABLE "BookingRec" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "attendees" TEXT NOT NULL,
    "attendeeEmail" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "BookingRec_pkey" PRIMARY KEY ("id")
);
