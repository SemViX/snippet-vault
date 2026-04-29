import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsService } from './snippets.service';
import { beforeEach, describe, it } from 'node:test';

describe('SnippetsService', () => {
  let service: SnippetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnippetsService],
    }).compile();

    service = module.get<SnippetsService>(SnippetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
