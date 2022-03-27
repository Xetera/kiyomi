import { Test, TestingModule } from '@nestjs/testing';
import { PrismaController } from './prisma.controller';

describe('PrismaController', () => {
  let controller: PrismaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrismaController],
    }).compile();

    controller = module.get<PrismaController>(PrismaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
