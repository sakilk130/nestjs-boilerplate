import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../entities/user.entity';

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
        where: {
          id,
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      delete user.password;
      delete user.deleted_at;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
