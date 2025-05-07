import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { hash } from 'bcrypt';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from './dto/query.dto';

config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = Number(process.env.SALT_ROUNDS);
      const findUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (findUser) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await hash(createUserDto.password, salt);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      delete user.password;
      delete user.deleted_at;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        relations: {
          roles: {
            permissions: true,
          },
        },
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          status: true,
          roles: {
            name: true,
            permissions: {
              id: true,
              name: true,
              module_name: true,
            },
          },
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      delete user.password;
      delete user.deleted_at;
      return {
        ...user,
        roles: user.roles.map((role) => role.name),
        permissions: user.roles
          .map((role) => role.permissions.map((permission) => permission.name))
          .flat(),
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryDto) {
    try {
      const { page, limit, search } = query;
      const skip = (page - 1) * limit;

      const where = search
        ? [{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }]
        : [];

      const [users, total] = await this.userRepository.findAndCount({
        where,
        relations: {
          roles: {
            permissions: true,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          status: true,
          roles: {
            name: true,
          },
        },
        take: limit,
        skip,
      });
      const totalPages = Math.ceil(total / limit);
      const paginatedUsers = users.map((user) => ({
        ...user,
        roles: user.roles.map((role) => role.name),
      }));
      return {
        data: paginatedUsers,
        total,
        page,
        limit,
        total_pages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const updatedUser = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
      delete updatedUser.password;
      delete updatedUser.deleted_at;
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      await this.userRepository.softDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
