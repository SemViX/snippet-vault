import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Snippet, SnippetDocument } from './snippet.schema';
import { Model } from 'mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto) {
    const snippet = await this.snippetModel.create(createSnippetDto);
    return snippet;
  }

  async findAll(query: {
    q?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: {
      $or?: Array<{
        title?: { $regex: string; $options: string };
        content?: { $regex: string; $options: string };
      }>;
      tags?: string;
    } = {};

    if (query.q) {
      filter.$or = [
        { title: { $regex: query.q, $options: 'i' } },
        { content: { $regex: query.q, $options: 'i' } },
      ];
    }
    if (query.tag) {
      filter.tags = query.tag;
    }

    const [items, total] = await Promise.all([
      this.snippetModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.snippetModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const snippet = await this.snippetModel.findById(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto) {
    const snippet = await this.snippetModel.findByIdAndUpdate(
      id,
      updateSnippetDto,
      {
        new: true,
      },
    );

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  async remove(id: string) {
    const snippet = await this.snippetModel.findByIdAndDelete(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return {
      message: 'Snippet deleted successfully',
    };
  }
}
