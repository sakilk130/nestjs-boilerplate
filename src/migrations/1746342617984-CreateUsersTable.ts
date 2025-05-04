import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1746342617984 implements MigrationInterface {
    name = 'CreateUsersTable1746342617984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` bigint NULL, \`name\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`avatar\` varchar(100) NULL, \`phone\` varchar(100) NULL, \`address\` varchar(100) NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`status\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
