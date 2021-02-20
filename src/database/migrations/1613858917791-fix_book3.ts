import {MigrationInterface, QueryRunner} from "typeorm";

export class fixBook31613858917791 implements MigrationInterface {
    name = 'fixBook31613858917791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL DEFAULT 'NULL'");
    }

}
