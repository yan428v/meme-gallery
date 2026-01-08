import {
  Injectable,
  NotFoundException,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemesRepository } from './memes.repository';
import { GetMemesQueryDto } from './dto/get-memes-query.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { IMeme, IImgflipResponse } from './interfaces/meme.interface';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { Configuration } from '../../config/configuration';

@Injectable()
export class MemesService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MemesService.name);

  constructor(
    private readonly memesRepository: MemesRepository,
    private readonly configService: ConfigService<Configuration>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.seedData();
    } catch (err) {
      this.logger.error('Seeding failed but app will continue', err);
    }
  }

  private async seedData(): Promise<void> {
    try {
      const count = await this.memesRepository.count();

      if (count > 0) {
        this.logger.log('Data already seeded, skipping...');
        return;
      }

      const imgflipApiUrl = this.configService.get('imgflip.apiUrl', {
        infer: true,
      });

      if (!imgflipApiUrl) {
        this.logger.error('IMGFLIP_API_URL is not configured');
        return;
      }

      this.logger.log('Fetching memes from imgflip API...');

      const response = await fetch(imgflipApiUrl, {
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as IImgflipResponse;

      if (!data.success || !data.data.memes) {
        throw new Error('Invalid response from imgflip API');
      }

      const memes = data.data.memes.map((meme) => ({
        name: meme.name,
        imageUrl: meme.url,
      }));

      await this.memesRepository.bulkCreate(memes);
      this.logger.log(`Successfully seeded ${memes.length} memes`);
    } catch (error) {
      this.logger.error('Failed to seed data from imgflip API', error);
    }
  }

  async getMemes(query: GetMemesQueryDto): Promise<PaginatedResponse<IMeme>> {
    const { limit = 10, cursor } = query;

    const memes = await this.memesRepository.findAll(limit, cursor);

    const hasMore = memes.length > limit;
    const data = hasMore ? memes.slice(0, limit) : memes;
    const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

    return {
      data: data.map((meme) => ({
        id: meme._id.toString(),
        name: meme.name,
        imageUrl: meme.imageUrl,
      })),
      nextCursor,
      hasMore,
    };
  }

  async updateMeme(id: string, updateDto: UpdateMemeDto): Promise<IMeme> {
    const meme = await this.memesRepository.updateById(id, updateDto);

    if (!meme) {
      throw new NotFoundException(`Meme with id '${id}' not found`);
    }

    return {
      id: meme._id.toString(),
      name: meme.name,
      imageUrl: meme.imageUrl,
    };
  }
}
