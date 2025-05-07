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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Permissions } from 'src/shared/decorators/permissions.decorator';
import { PERMISSION_PERMISSIONS } from 'src/shared/enums/permissions.enum';

@Controller('permissions')
@ApiTags('Permissions')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiBearerAuth('JWT')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Permissions(PERMISSION_PERMISSIONS.permissions.PERMISSION_CREATE)
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    try {
      const permission =
        await this.permissionsService.create(createPermissionDto);
      return {
        status: 200,
        message: 'Permission created successfully',
        data: permission,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @Permissions(PERMISSION_PERMISSIONS.permissions.PERMISSION_READ)
  async findAll() {
    try {
      const permissions = await this.permissionsService.findAll();
      return {
        status: 200,
        message: 'Permissions retrieved successfully',
        data: permissions,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @Permissions(PERMISSION_PERMISSIONS.permissions.PERMISSION_READ)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const permission = await this.permissionsService.findOne(id);
      return {
        status: 200,
        message: 'Permission retrieved successfully',
        data: permission,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @Permissions(PERMISSION_PERMISSIONS.permissions.PERMISSION_UPDATE)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    try {
      const permission = await this.permissionsService.update(
        id,
        updatePermissionDto,
      );
      return {
        status: 200,
        message: 'Permission updated successfully',
        data: permission,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @Permissions(PERMISSION_PERMISSIONS.permissions.PERMISSION_DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const permission = await this.permissionsService.remove(id);
      return {
        status: 200,
        message: 'Permission deleted successfully',
        data: permission,
      };
    } catch (error) {
      throw error;
    }
  }
}
