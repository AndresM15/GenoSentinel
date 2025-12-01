import { TestBed } from '@angular/core/testing';

import { GenomicsService } from './genomics';

describe('Genomics', () => {
  let service: GenomicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenomicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
