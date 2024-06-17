-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "rateAverage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "voteCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
