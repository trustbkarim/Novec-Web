import { TestBed } from '@angular/core/testing';

import { ConstatService } from './constat.service';

describe('ConstatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstatService = TestBed.get(ConstatService);
    expect(service).toBeTruthy();
  });
});
