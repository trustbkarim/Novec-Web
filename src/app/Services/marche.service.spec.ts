import { TestBed } from '@angular/core/testing';

import { MarcheService } from './marche.service';

describe('MarcheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcheService = TestBed.get(MarcheService);
    expect(service).toBeTruthy();
  });
});
