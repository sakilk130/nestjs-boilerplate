import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    required: true,
    default: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true,
    default: 'john@john.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @Length(3, 100, { message: 'Email must be between 3 and 100 characters' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    default: 'password',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
  password: string;

  @ApiProperty({
    description: 'Avatar of the user',
    type: String,
    required: false,
    default: 'avatar.png',
  })
  @IsString({ message: 'Avatar must be a string' })
  @Length(3, 100, { message: 'Avatar must be between 3 and 100 characters' })
  avatar: string;

  @ApiProperty({
    description: 'Phone number of the user',
    type: String,
    required: false,
    default: '08123456789',
  })
  @IsString({ message: 'Phone must be a string' })
  @Length(3, 100, { message: 'Phone must be between 3 and 100 characters' })
  phone: string;

  @ApiProperty({
    description: 'Address of the user',
    type: String,
    required: false,
    default: 'Jakarta',
  })
  @IsString({ message: 'Address must be a string' })
  @Length(3, 100, { message: 'Address must be between 3 and 100 characters' })
  address: string;
}
