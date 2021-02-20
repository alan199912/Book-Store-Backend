import {MigrationInterface, QueryRunner} from "typeorm";

export class bookEntityAdded1613855349467 implements MigrationInterface {
    name = 'bookEntityAdded1613855349467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `books` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `description` varchar(500) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_book` (`usersId` int NOT NULL, `booksId` int NOT NULL, INDEX `IDX_0a2513b8e37e9ae71c99be500d` (`usersId`), INDEX `IDX_c57f60b1d92c48089146963ec2` (`booksId`), PRIMARY KEY (`usersId`, `booksId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user_book` ADD CONSTRAINT `FK_0a2513b8e37e9ae71c99be500d4` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_book` ADD CONSTRAINT `FK_c57f60b1d92c48089146963ec2d` FOREIGN KEY (`booksId`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_book` DROP FOREIGN KEY `FK_c57f60b1d92c48089146963ec2d`");
        await queryRunner.query("ALTER TABLE `user_book` DROP FOREIGN KEY `FK_0a2513b8e37e9ae71c99be500d4`");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP INDEX `IDX_c57f60b1d92c48089146963ec2` ON `user_book`");
        await queryRunner.query("DROP INDEX `IDX_0a2513b8e37e9ae71c99be500d` ON `user_book`");
        await queryRunner.query("DROP TABLE `user_book`");
        await queryRunner.query("DROP TABLE `books`");
    }

}
