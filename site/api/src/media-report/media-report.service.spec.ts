import { Test, TestingModule } from '@nestjs/testing';
import { MediaReportService } from './media-report.service';

describe('MediaReportService', () => {
  let service: MediaReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaReportService],
    }).compile();

    service = module.get<MediaReportService>(MediaReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
