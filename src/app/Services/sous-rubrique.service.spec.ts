import { TestBed } from '@angular/core/testing';

import { SousRubriqueService } from './sous-rubrique.service';

describe('SousRubriqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SousRubriqueService = TestBed.get(SousRubriqueService);
    expect(service).toBeTruthy();
  });
});
