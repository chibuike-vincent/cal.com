/*
  Warnings:

  - You are about to drop the `EventTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EventTypes";

-- CreateTable
CREATE TABLE "EventsType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "EventsType_pkey" PRIMARY KEY ("id")
);
