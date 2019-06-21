import { TestBed } from '@angular/core/testing';

import { MarcheViewService } from './marche-view.service';

describe('MarcheViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcheViewService = TestBed.get(MarcheViewService);
    expect(service).toBeTruthy();
  });
});
