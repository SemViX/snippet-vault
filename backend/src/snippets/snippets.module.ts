import { Module } from '@nestjs/common';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './snippet.schema';

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Snippet.name,
        schema: SnippetSchema,
      },
    ]),
  ],
})
export class SnippetsModule {}
