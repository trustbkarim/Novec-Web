import { TestBed } from '@angular/core/testing';

import { RubriqueViewService } from './rubrique-view.service';

describe('RubriqueViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubriqueViewService = TestBed.get(RubriqueViewService);
    expect(service).toBeTruthy();
  });
});
