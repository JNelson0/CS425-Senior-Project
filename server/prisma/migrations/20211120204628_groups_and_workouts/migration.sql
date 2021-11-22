/*
  Warnings:

  - You are about to drop the column `name` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `EventMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupMembership` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tag]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('WEIGHTS');

-- DropForeignKey
ALTER TABLE "EventMembership" DROP CONSTRAINT "EventMembership_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventMembership" DROP CONSTRAINT "EventMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembership" DROP CONSTRAINT "GroupMembership_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembership" DROP CONSTRAINT "GroupMembership_userId_fkey";

-- DropIndex
DROP INDEX "Group_name_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "name",
ADD COLUMN     "tag" TEXT NOT NULL;

-- DropTable
DROP TABLE "EventMembership";

-- DropTable
DROP TABLE "GroupMembership";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseResponse" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMembershipInEvent" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" "EventMembershipRole" NOT NULL,

    CONSTRAINT "UserMembershipInEvent_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "GroupMembershipInEvent" (
    "groupId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" "EventMembershipRole" NOT NULL,

    CONSTRAINT "GroupMembershipInEvent_pkey" PRIMARY KEY ("groupId","eventId")
);

-- CreateTable
CREATE TABLE "UserMembershipInGroup" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "role" "GroupMembershipRole" NOT NULL,

    CONSTRAINT "UserMembershipInGroup_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_tag_key" ON "Group"("tag");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResponse" ADD CONSTRAINT "ExerciseResponse_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResponse" ADD CONSTRAINT "ExerciseResponse_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResponse" ADD CONSTRAINT "ExerciseResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInEvent" ADD CONSTRAINT "UserMembershipInEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInEvent" ADD CONSTRAINT "UserMembershipInEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembershipInEvent" ADD CONSTRAINT "GroupMembershipInEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembershipInEvent" ADD CONSTRAINT "GroupMembershipInEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInGroup" ADD CONSTRAINT "UserMembershipInGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInGroup" ADD CONSTRAINT "UserMembershipInGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
