import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    description: 'Page number for pagination',
    type: Number,
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'Page must be an integer',
  })
  @Min(1, {
    message: 'Page must be greater than or equal to 1',
  })
  @IsPositive({
    message: 'Page must be a positive number',
  })
  page: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    type: Number,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'Limit must be an integer',
  })
  @Min(1, {
    message: 'Limit must be greater than or equal to 1',
  })
  @IsPositive({
    message: 'Limit must be a positive number',
  })
  limit: number = 10;

  @ApiProperty({
    description: 'Search term for filtering results',
    type: String,
    required: false,
    default: '',
  })
  @IsOptional()
  search: string = '';
}
