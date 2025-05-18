import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixJoinTables1747590717265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop old duplicate tables
    await queryRunner.query(`DROP TABLE IF EXISTS users_roles_roles`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS roles_permissions_permissions`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
