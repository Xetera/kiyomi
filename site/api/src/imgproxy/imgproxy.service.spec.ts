import { Test, TestingModule } from '@nestjs/testing';
import { ImgproxyService } from './imgproxy.service';

describe('ImgproxyService', () => {
  let service: ImgproxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgproxyService],
    }).compile();

    service = module.get<ImgproxyService>(ImgproxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
