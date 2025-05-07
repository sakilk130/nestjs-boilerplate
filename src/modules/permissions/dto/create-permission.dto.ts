import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  isBoolean,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Name of the permission',
    type: String,
    required: true,
    default: 'read',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @ApiProperty({
    description: 'Description of the permission',
    type: String,
    required: true,
    default: 'read.user',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @Length(3, 100, {
    message: 'Description must be between 3 and 100 characters',
  })
  description: string;

  @ApiProperty({
    description: 'Module name of the permission',
    type: String,
    required: true,
    default: 'User Management',
  })
  @IsNotEmpty({ message: 'Module name is required' })
  @IsString({ message: 'Module name must be a string' })
  @Length(3, 50, { message: 'Module name must be between 3 and 50 characters' })
  module_name: string;

  @ApiProperty({
    description: 'Status of the permission',
    type: Boolean,
    required: true,
    default: true,
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsBoolean({ message: 'Status must be a boolean' })
  status: boolean;
}
