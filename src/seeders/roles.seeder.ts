import { DataSource } from 'typeorm';
import * as path from 'path';
import { Role } from '../entities/roles.entity';
import { Permission } from '../entities/permission.entity';
import { permissions } from '../constants/permissions';
import { ROLES } from 'src/shared/enums/roles.enum';

const dataSourceConfigPath = path.join(__dirname, '../config/db.ts');
const initialRoles = [
  {
    name: ROLES.ADMIN,
    description: 'Administrator role with all permissions',
    status: true,
  },
];

async function seedRoles() {
  console.log('Starting roles seeder...');

  let dataSource: DataSource | undefined;
  try {
    dataSource = await import(dataSourceConfigPath).then(
      (module) => module.default,
    );
    await dataSource.initialize();

    const roleRepository = dataSource.getRepository('Role');

    for (const role of initialRoles) {
      const existingRole = await roleRepository.findOne({
        where: { name: role.name },
      });
      if (!existingRole) {
        await roleRepository.save(role);
        console.log(`Role ${role.name} seeded successfully.`);
      } else {
        console.log(`Role ${role.name} already exists. Skipping seeding.`);
      }
    }
    console.log('Roles seeder completed successfully.');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    if (dataSource) {
      await dataSource.destroy();
      console.log('Data Source has been destroyed.');
    }
  }
}

async function addPermissionsToRole(
  roleName: string,
  permissionNames: string[],
): Promise<void> {
  console.log(
    `Attempting to add permissions [${permissionNames.join(', ')}] to role "${roleName}"...`,
  );

  let dataSource: DataSource | undefined;

  try {
    const dataSourceModule = await import(dataSourceConfigPath);
    dataSource = dataSourceModule.default;

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('Data Source has been initialized!');
    }

    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);

    const role = await roleRepository.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });

    if (!role) {
      console.error(`Role "${roleName}" not found.`);
      return;
    }

    const permissionsToAdd = await permissionRepository.find({
      where: permissionNames.map((name) => ({ name })),
    });

    if (permissionsToAdd.length !== permissionNames.length) {
      const foundNames = permissionsToAdd.map((p) => p.name);
      const missingNames = permissionNames.filter(
        (name) => !foundNames.includes(name),
      );
      console.warn(
        `Could not find all requested permissions. Missing: [${missingNames.join(', ')}]`,
      );
      if (permissionsToAdd.length === 0) {
        console.error('No valid permissions found to add. Aborting.');
        return;
      }
    }

    if (!role.permissions) {
      role.permissions = [];
    }

    let permissionsAddedCount = 0;
    for (const permission of permissionsToAdd) {
      const alreadyLinked = role.permissions.some(
        (existingPerm) => existingPerm.id === permission.id,
      );

      if (!alreadyLinked) {
        role.permissions.push(permission);
        permissionsAddedCount++;
        console.log(
          `Permission "${permission.name}" added to "${role.name}" array.`,
        );
      } else {
        console.log(
          `Permission "${permission.name}" is already linked to "${role.name}". Skipping.`,
        );
      }
    }

    if (permissionsAddedCount > 0) {
      await roleRepository.save(role);
      console.log(
        `Role "${roleName}" saved successfully. ${permissionsAddedCount} new permission(s) linked.`,
      );
    } else {
      console.log(`No new permissions were needed for Role "${roleName}".`);
    }
  } catch (error) {
    console.error('Error adding permissions to role:', error);
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Data Source has been destroyed.');
    }
  }
}

seedRoles().then(() => {
  addPermissionsToRole(
    ROLES.ADMIN,
    permissions.map((p) => p.name),
  );
});
