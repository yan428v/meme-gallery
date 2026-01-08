import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Meme, MemeDocument } from './schemas/meme.schema';

@Injectable()
export class MemesRepository {
  constructor(@InjectModel(Meme.name) private memeModel: Model<MemeDocument>) {}

  async findAll(
    limit: number,
    cursor?: string,
  ): Promise<(MemeDocument & { _id: Types.ObjectId })[]> {
    let query = {};

    if (cursor) {
      if (!Types.ObjectId.isValid(cursor)) {
        return [];
      }
      query = { _id: { $gt: new Types.ObjectId(cursor) } };
    }

    return this.memeModel
      .find(query)
      .sort({ _id: 1 })
      .limit(limit + 1)
      .exec();
  }

  async updateById(
    id: string,
    data: Partial<Meme>,
  ): Promise<MemeDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.memeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async count(): Promise<number> {
    return this.memeModel.countDocuments().exec();
  }

  async bulkCreate(memes: Partial<Meme>[]): Promise<void> {
    await this.memeModel.insertMany(memes);
  }
}
