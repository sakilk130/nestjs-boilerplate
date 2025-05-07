import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/roles.entity';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const findRole = await this.roleRepository.findOne({
        where: {
          name: createRoleDto.name,
        },
      });
      if (findRole) {
        throw new BadRequestException('Role already exists');
      }
      const permissions = await this.permissionRepository.find({
        where: { id: In(createRoleDto.permissions) },
      });
      const role = this.roleRepository.create({
        ...createRoleDto,
        permissions,
      });
      return await this.roleRepository.save(role);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find({
        relations: {
          permissions: true,
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          permissions: {
            id: true,
            name: true,
            description: true,
            status: true,
          },
        },
      });
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOne({
        relations: {
          permissions: true,
        },
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          permissions: {
            id: true,
            name: true,
            description: true,
            status: true,
          },
        },
      });
      return role;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const findRole = await this.roleRepository.findOne({
        where: {
          id,
        },
      });
      if (!findRole) {
        throw new BadRequestException('Role not found');
      }
      const permissions = await this.permissionRepository.find({
        where: { id: In(updateRoleDto.permissions) },
      });
      const role = this.roleRepository.create({
        ...updateRoleDto,
        permissions,
      });
      return await this.roleRepository.save(role);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const findRole = await this.roleRepository.findOne({
        where: {
          id,
        },
      });
      if (!findRole) {
        throw new BadRequestException('Role not found');
      }
      return await this.roleRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
