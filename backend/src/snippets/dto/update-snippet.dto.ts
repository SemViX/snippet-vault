import { CreateSnippetDto } from './create-snippet.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSnippetDto extends PartialType(CreateSnippetDto) {}
