import { Test, TestingModule } from '@nestjs/testing';
import { AliasService } from './alias.service';

describe('AliasService', () => {
  let service: AliasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AliasService],
    }).compile();

    service = module.get<AliasService>(AliasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
