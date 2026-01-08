import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MemesService } from './memes.service';
import { GetMemesQueryDto } from './dto/get-memes-query.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { MemeResponseDto } from './dto/meme-response.dto';
import { MemeIdParamDto } from './dto/meme-id-param.dto';

@ApiTags('Memes')
@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated list of memes' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated memes',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              name: { type: 'string', example: 'Drake Hotline Bling' },
              imageUrl: {
                type: 'string',
                example: 'https://i.imgflip.com/30b1gx.jpg',
              },
            },
          },
        },
        nextCursor: {
          type: 'string',
          nullable: true,
          example: '507f1f77bcf86cd799439020',
        },
        hasMore: { type: 'boolean', example: true },
      },
    },
  })
  async getMemes(@Query() query: GetMemesQueryDto) {
    return this.memesService.getMemes(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update meme name' })
  @ApiResponse({
    status: 200,
    description: 'Meme updated successfully',
    type: MemeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['name should not be empty'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Meme not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: "Meme with id '507f1f77bcf86cd799439011' not found",
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async updateMeme(
    @Param() params: MemeIdParamDto,
    @Body() updateDto: UpdateMemeDto,
  ): Promise<MemeResponseDto> {
    return this.memesService.updateMeme(params.id, updateDto);
  }
}
