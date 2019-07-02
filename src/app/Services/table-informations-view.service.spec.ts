import { TestBed } from '@angular/core/testing';

import { TableInformationsViewService } from './table-informations-view.service';

describe('TableInformationsViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableInformationsViewService = TestBed.get(TableInformationsViewService);
    expect(service).toBeTruthy();
  });
});
