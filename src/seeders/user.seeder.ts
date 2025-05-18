import { DataSource } from 'typeorm';
import * as path from 'path';
import { hash } from 'bcrypt';
import { config } from 'dotenv';

import { User } from '../entities/user.entity';
import { Role } from '../entities/roles.entity';

const dataSourceConfigPath = path.join(__dirname, '../config/db.ts');

config();

const salt = Number(process.env.SALT_ROUNDS);

async function seedAdminUser() {
  const adminUserData = {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: await hash('password', salt),
    avatar: null,
    phone: null,
    address: null,
    status: true,
    roles: [],
  };

  console.log('Starting admin user seeder...');

  let dataSource: DataSource | undefined;

  try {
    const dataSourceModule = await import(dataSourceConfigPath);
    dataSource = dataSourceModule.default;

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('Data Source has been initialized!');
    }

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const existingAdminUser = await userRepository.findOneBy({
      email: adminUserData.email,
    });

    if (!existingAdminUser) {
      console.warn(
        'WARNING: Seeding with a placeholder password. Implement actual password hashing!',
      );

      const newUser = userRepository.create(adminUserData);

      const adminRole = await roleRepository.findOneBy({ name: 'admin' });

      if (adminRole) {
        newUser.roles = [adminRole];
        console.log(`Admin role found and linked to user "${newUser.email}".`);
      } else {
        console.warn(
          "WARNING: 'Admin' role not found. Admin user created without the Admin role linked.",
        );
        console.warn(
          'Please ensure the roles seeder runs before or with the admin user seeder.',
        );
      }

      await userRepository.save(newUser);
      console.log(`Admin user "${newUser.email}" seeded successfully.`);
    } else {
      console.log(
        `Admin user "${adminUserData.email}" already exists. Skipping seeding.`,
      );
    }

    console.log('Admin user seeder finished.');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Data Source has been destroyed.');
    }
  }
}

seedAdminUser();
