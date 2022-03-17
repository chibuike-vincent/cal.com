-- CreateTable
CREATE TABLE "BookingDoc" (
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

    CONSTRAINT "BookingDoc_pkey" PRIMARY KEY ("id")
);
