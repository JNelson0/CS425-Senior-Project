/*
  Warnings:

  - You are about to drop the `UserInEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EventMembershipRole" AS ENUM ('OWNER', 'INVITEE');

-- CreateEnum
CREATE TYPE "GroupMembershipRole" AS ENUM ('OWNER', 'INVITEE');

-- DropForeignKey
ALTER TABLE "UserInEvent" DROP CONSTRAINT "UserInEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserInEvent" DROP CONSTRAINT "UserInEvent_userId_fkey";

-- DropTable
DROP TABLE "UserInEvent";

-- DropEnum
DROP TYPE "UserInEventRole";

-- CreateTable
CREATE TABLE "EventMembership" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" "EventMembershipRole" NOT NULL,

    CONSTRAINT "EventMembership_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMembership" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "role" "GroupMembershipRole" NOT NULL,

    CONSTRAINT "GroupMembership_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- AddForeignKey
ALTER TABLE "EventMembership" ADD CONSTRAINT "EventMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMembership" ADD CONSTRAINT "EventMembership_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
