import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRBACTables1746357033642 implements MigrationInterface {
    name = 'CreateRBACTables1746357033642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`deleted_by\` bigint NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`status\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_permissions_permissions\` (\`rolesId\` int NOT NULL, \`permissionsId\` int NOT NULL, INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` (\`rolesId\`), INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` (\`permissionsId\`), PRIMARY KEY (\`rolesId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles_roles\` (\`usersId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_df951a64f09865171d2d7a502b\` (\`usersId\`), INDEX \`IDX_b2f0366aa9349789527e0c36d9\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_dc2b9d46195bb3ed28abbf7c9e3\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_fd4d5d4c7f7ff16c57549b72c6f\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_df951a64f09865171d2d7a502b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_b2f0366aa9349789527e0c36d97\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_b2f0366aa9349789527e0c36d97\``);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_df951a64f09865171d2d7a502b1\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_fd4d5d4c7f7ff16c57549b72c6f\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_dc2b9d46195bb3ed28abbf7c9e3\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2f0366aa9349789527e0c36d9\` ON \`users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_df951a64f09865171d2d7a502b\` ON \`users_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
