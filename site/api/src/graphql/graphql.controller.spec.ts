import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlController } from './graphql.controller';

describe('GraphqlController', () => {
  let controller: GraphqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphqlController],
    }).compile();

    controller = module.get<GraphqlController>(GraphqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
