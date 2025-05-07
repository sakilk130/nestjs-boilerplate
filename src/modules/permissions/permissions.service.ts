import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const previousPermission = await this.permissionRepository.findOne({
        where: {
          name: createPermissionDto.name,
          module_name: createPermissionDto.module_name,
        },
      });
      if (previousPermission) {
        throw new BadRequestException(
          'Permission already exists in this module',
        );
      }
      const permission = this.permissionRepository.create(createPermissionDto);
      await this.permissionRepository.save(permission);
      delete permission.deleted_at;
      delete permission.updated_at;
      delete permission.created_at;

      return permission;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const results = await this.permissionRepository
        .createQueryBuilder('permissions')
        .select([
          'permissions.module_name AS module_name',
          'GROUP_CONCAT(permissions.name) AS permissions_names',
          'SUM(CASE WHEN permissions.deleted_at IS NULL THEN 1 ELSE 0 END) AS permission_count',
        ])
        .where('permissions.deleted_at IS NULL')
        .groupBy('permissions.module_name')
        .getRawMany();
      const parsedResults = results.map((result) => ({
        module_name: result.module_name,
        permission_count: Number(result.permission_count),
        permissions: result.permissions_names.split(','),
      }));
      return parsedResults;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const permission = await this.permissionRepository.findOne({
        where: {
          id,
        },
        select: ['id', 'name', 'module_name'],
      });
      if (!permission) {
        throw new Error('Permission not found');
      }
      return permission;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const permission = await this.permissionRepository.findOne({
        where: {
          id,
        },
      });
      if (!permission) {
        throw new Error('Permission not found');
      }
      const updatedPermission = Object.assign(permission, updatePermissionDto);
      await this.permissionRepository.save(updatedPermission);
      delete updatedPermission.deleted_at;
      delete updatedPermission.updated_at;
      delete updatedPermission.created_at;

      return updatedPermission;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const permission = await this.permissionRepository.findOne({
        where: {
          id,
        },
      });
      if (!permission) {
        throw new Error('Permission not found');
      }
      return await this.permissionRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
