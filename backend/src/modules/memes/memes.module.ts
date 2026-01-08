import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { MemesRepository } from './memes.repository';
import { Meme, MemeSchema } from './schemas/meme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }]),
  ],
  controllers: [MemesController],
  providers: [MemesService, MemesRepository],
})
export class MemesModule {}
