CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "login" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "version" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Artist" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "grammy" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "Album" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID,
    FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL
);

CREATE TABLE "Track" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" UUID,
    "albumId" UUID,
    FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL,
    FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL
);

CREATE TABLE "_UserFavoriteArtists" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,
    PRIMARY KEY ("A", "B"),
    FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE
);

CREATE TABLE "_UserFavoriteAlbums" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,
    PRIMARY KEY ("A", "B"),
    FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Album"("id") ON DELETE CASCADE
);

CREATE TABLE "_UserFavoriteTracks" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,
    PRIMARY KEY ("A", "B"),
    FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE
);
