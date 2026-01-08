import { ApiProperty } from '@nestjs/swagger';

export class MemeResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id!: string;

  @ApiProperty({ example: 'Drake Hotline Bling' })
  name!: string;

  @ApiProperty({ example: 'https://i.imgflip.com/30b1gx.jpg' })
  imageUrl!: string;
}
