import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MemeIdParamDto {
  @ApiProperty({
    description: 'MongoDB ObjectId',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId({ message: 'Invalid meme ID format' })
  id!: string;
}
