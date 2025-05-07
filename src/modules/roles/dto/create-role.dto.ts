import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../../entities/permission.entity';
import { USER_PERMISSIONS } from 'src/shared/enums/permissions.enum';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
    default: 'Admin',
  })
  @IsString({
    message: 'Name must be a string',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the role',
    example: 'Administrator role with full permissions',
    required: false,
  })
  @IsString({
    message: 'Description must be a string',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Status of the role, true if active',
    example: true,
    required: false,
  })
  @IsBoolean({
    message: 'Status must be a boolean',
  })
  @IsOptional()
  status: boolean = true;

  @ApiProperty({
    description: 'Array of permissions associated with the role',
    type: [Number],
    required: true,
    default: [1],
  })
  @IsArray({
    message: 'Permissions must be an array',
  })
  @ArrayNotEmpty({
    message: 'Permissions array should not be empty',
  })
  permissions: Number[];
}
