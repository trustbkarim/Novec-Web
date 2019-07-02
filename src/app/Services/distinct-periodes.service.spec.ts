import { TestBed } from '@angular/core/testing';

import { DistinctPeriodesService } from './distinct-periodes.service';

describe('DistinctPeriodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistinctPeriodesService = TestBed.get(DistinctPeriodesService);
    expect(service).toBeTruthy();
  });
});
