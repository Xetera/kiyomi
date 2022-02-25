import { Test, TestingModule } from '@nestjs/testing';
import { UploaderService } from './uploader.service';

describe('UploaderService', () => {
  let service: UploaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploaderService],
    }).compile();

    service = module.get<UploaderService>(UploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
