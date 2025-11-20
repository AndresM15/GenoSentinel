import { Test, TestingModule } from '@nestjs/testing';
import { TumorTypeController } from './tumor-type.controller';
import { TumorTypeService } from './tumor-type.service';

describe('TumorTypeController', () => {
  let controller: TumorTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TumorTypeController],
      providers: [TumorTypeService],
    }).compile();

    controller = module.get<TumorTypeController>(TumorTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
