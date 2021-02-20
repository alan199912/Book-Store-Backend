import {MigrationInterface, QueryRunner} from "typeorm";

export class fixBook1613857332457 implements MigrationInterface {
    name = 'fixBook1613857332457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'");
    }

}
