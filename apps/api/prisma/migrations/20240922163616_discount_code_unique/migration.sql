/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `DiscountType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DiscountType_code_key` ON `DiscountType`(`code`);
