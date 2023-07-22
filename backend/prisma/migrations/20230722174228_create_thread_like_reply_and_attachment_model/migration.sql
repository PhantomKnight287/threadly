-- AlterTable
ALTER TABLE "User" ADD COLUMN "profileUrl" TEXT;

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    CONSTRAINT "Thread_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "repliesId" TEXT,
    CONSTRAINT "Like_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_repliesId_fkey" FOREIGN KEY ("repliesId") REFERENCES "Reply" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "threadId" TEXT,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Attachment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Thread_id_key" ON "Thread"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reply_id_key" ON "Reply"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_id_key" ON "Attachment"("id");
