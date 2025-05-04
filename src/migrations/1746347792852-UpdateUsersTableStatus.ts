import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTableStatus1746347792852 implements MigrationInterface {
    name = 'UpdateUsersTableStatus1746347792852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`status\` \`status\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`status\` \`status\` tinyint NOT NULL DEFAULT '0'`);
    }

}
