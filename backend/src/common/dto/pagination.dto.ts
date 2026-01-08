import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Number of items to return',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiProperty({
    required: false,
    description: 'Cursor for pagination (MongoDB ObjectId)',
  })
  @IsOptional()
  @IsString()
  cursor?: string;
}
