import { TestBed } from '@angular/core/testing';

import { PeriodeService } from './periode.service';

describe('PeriodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodeService = TestBed.get(PeriodeService);
    expect(service).toBeTruthy();
  });
});
