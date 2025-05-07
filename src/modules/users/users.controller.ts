import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { USER_PERMISSIONS } from 'src/shared/enums/permissions.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from './dto/query.dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions(USER_PERMISSIONS.permissions.USER_CREATE)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      status: 200,
      message: 'User created successfully',
      data: user,
    };
  }

  @Get()
  @Permissions(USER_PERMISSIONS.permissions.USER_READ)
  async findAll(@Query() query: QueryDto) {
    const users = await this.usersService.findAll(query);
    return {
      status: 200,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  @Permissions(USER_PERMISSIONS.permissions.USER_READ)
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    return {
      status: 200,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @Permissions(USER_PERMISSIONS.permissions.USER_UPDATE)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      status: 200,
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @Permissions(USER_PERMISSIONS.permissions.USER_DELETE)
  async remove(@Param('id') id: number) {
    const user = await this.usersService.remove(id);
    return {
      status: 200,
      message: 'User deleted successfully',
      data: null,
    };
  }
}
