import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { ROLE_PERMISSIONS } from 'src/shared/enums/permissions.enum';

@Controller('roles')
@ApiTags('Roles')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiBearerAuth('JWT')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Permissions(ROLE_PERMISSIONS.permissions.ROLE_CREATE)
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const role = await this.rolesService.create(createRoleDto);
      return {
        status: 200,
        message: 'Role created successfully',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @Permissions(ROLE_PERMISSIONS.permissions.ROLE_READ)
  async findAll() {
    try {
      const roles = await this.rolesService.findAll();
      return {
        status: 200,
        message: 'Roles fetched successfully',
        data: roles,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @Permissions(ROLE_PERMISSIONS.permissions.ROLE_READ)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const role = await this.rolesService.findOne(id);
      return {
        status: 200,
        message: 'Role fetched successfully',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @Permissions(ROLE_PERMISSIONS.permissions.ROLE_UPDATE)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    try {
      const role = this.rolesService.update(id, updateRoleDto);
      return {
        status: 200,
        message: 'Role updated successfully',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const role = await this.rolesService.remove(id);
      return {
        status: 200,
        message: 'Role deleted successfully',
        data: role,
      };
    } catch (error) {
      throw error;
    }
  }
}
