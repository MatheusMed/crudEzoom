/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `tasks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "usuario_name_key";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";
