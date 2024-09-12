import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthorizeGuard } from 'src/shared/guards/authorize.guard';
import { ROLE } from 'src/shared/enums/roles.enum';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard, AuthorizeGuard([ROLE.ADMIN]))
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      status: 200,
      message: 'User created successfully',
      data: user,
    };
  }
}
