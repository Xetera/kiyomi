import { Test, TestingModule } from '@nestjs/testing';
import { FaceService } from './face.service';

describe('FaceService', () => {
  let service: FaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceService],
    }).compile();

    service = module.get<FaceService>(FaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
