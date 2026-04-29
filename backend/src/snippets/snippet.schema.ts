import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;

export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

@Schema({
  timestamps: true,
})
export class Snippet {
  @Prop({
    required: true,
    trim: true,
    index: true,
  })
  title!: string;

  @Prop({
    required: true,
    trim: true,
    index: true,
  })
  content!: string;

  @Prop({
    type: [String],
    default: [],
    index: true,
  })
  tags?: string[];

  @Prop({
    required: true,
    enum: SnippetType,
    default: SnippetType.NOTE,
  })
  type!: SnippetType;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

SnippetSchema.index({
  title: 'text',
  content: 'text',
});
