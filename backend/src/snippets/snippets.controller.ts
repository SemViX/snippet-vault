import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('tag') tag?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.snippetsService.findAll({
      q,
      tag,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(id);
  }
}
