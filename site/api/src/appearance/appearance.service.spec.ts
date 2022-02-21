import { Test, TestingModule } from '@nestjs/testing';
import { AppearanceService } from './appearance.service';

describe('AppearanceService', () => {
  let service: AppearanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppearanceService],
    }).compile();

    service = module.get<AppearanceService>(AppearanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
