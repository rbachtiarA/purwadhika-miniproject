-- AlterTable
ALTER TABLE `event` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'slug',
    ADD COLUMN `time_end` VARCHAR(191) NOT NULL DEFAULT '00:00',
    ADD COLUMN `time_start` VARCHAR(191) NOT NULL DEFAULT '00:00';
