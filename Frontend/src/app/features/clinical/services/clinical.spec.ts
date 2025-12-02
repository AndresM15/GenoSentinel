import { TestBed } from '@angular/core/testing';

import { ClinicalService } from './clinical';

describe('Clinical', () => {
  let service: ClinicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
