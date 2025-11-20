import { Test, TestingModule } from '@nestjs/testing';
import { TumorTypeService } from './tumor-type.service';

describe('TumorTypeService', () => {
  let service: TumorTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TumorTypeService],
    }).compile();

    service = module.get<TumorTypeService>(TumorTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
