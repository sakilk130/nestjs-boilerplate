import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRoleFromUser1746357690628 implements MigrationInterface {
    name = 'RemoveRoleFromUser1746357690628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`);
    }

}
