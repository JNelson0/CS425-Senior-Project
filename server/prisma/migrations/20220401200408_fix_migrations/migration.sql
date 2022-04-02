-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('STANDARD', 'WORKOUT');

-- CreateEnum
CREATE TYPE "EventMembershipRole" AS ENUM ('OWNER', 'INVITEE');

-- CreateEnum
CREATE TYPE "GroupMembershipRole" AS ENUM ('OWNER', 'INVITEE');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('WEIGHTS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "googleRefreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "finish" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordSalt_key" ON "User"("passwordSalt");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleRefreshToken_key" ON "User"("googleRefreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Group_tag_key" ON "Group"("tag");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResponse" ADD CONSTRAINT "ExerciseResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResponse" ADD CONSTRAINT "ExerciseResponse_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseResponse" ADD CONSTRAINT "ExerciseResponse_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInEvent" ADD CONSTRAINT "UserMembershipInEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInEvent" ADD CONSTRAINT "UserMembershipInEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembershipInEvent" ADD CONSTRAINT "GroupMembershipInEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembershipInEvent" ADD CONSTRAINT "GroupMembershipInEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInGroup" ADD CONSTRAINT "UserMembershipInGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembershipInGroup" ADD CONSTRAINT "UserMembershipInGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
