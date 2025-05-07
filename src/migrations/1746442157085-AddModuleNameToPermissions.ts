import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModuleNameToPermissions1746442157085
  implements MigrationInterface
{
  name = 'AddModuleNameToPermissions1746442157085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permissions\` ADD \`module_name\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permissions\` DROP COLUMN \`module_name\``,
    );
  }
}
