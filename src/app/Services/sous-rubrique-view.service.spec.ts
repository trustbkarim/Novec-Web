import { TestBed } from '@angular/core/testing';

import { SousRubriqueViewService } from './sous-rubrique-view.service';

describe('SousRubriqueViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SousRubriqueViewService = TestBed.get(SousRubriqueViewService);
    expect(service).toBeTruthy();
  });
});
