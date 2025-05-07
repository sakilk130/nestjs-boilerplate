import { DataSource } from 'typeorm';
import * as path from 'path';

import { Permission } from '../entities/permission.entity';
import { permissions } from '../constants/permissions';

const dataSourceConfigPath = path.join(__dirname, '../config/db.ts');

async function seedPermissions() {
  console.log('Starting permissions seeder...');

  let dataSource: DataSource | undefined;

  try {
    const dataSourceModule = await import(dataSourceConfigPath);
    dataSource = dataSourceModule.default;

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('Data Source has been initialized!');
    }

    const permissionRepository = dataSource.getRepository(Permission);

    for (const permData of permissions) {
      const existingPermission = await permissionRepository.findOneBy({
        name: permData.name,
      });

      if (!existingPermission) {
        const newPermission = permissionRepository.create(permData);
        await permissionRepository.save(newPermission);
        console.log(`Permission "${permData.name}" seeded successfully.`);
      } else {
        console.log(`Permission "${permData.name}" already exists. Skipping.`);
      }
    }

    console.log('Permissions seeder finished.');
  } catch (error) {
    console.error('Error seeding permissions:', error);
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Data Source has been destroyed.');
    }
  }
}

seedPermissions();
