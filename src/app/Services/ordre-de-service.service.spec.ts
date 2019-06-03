import { TestBed } from '@angular/core/testing';

import { OrdreDeServiceService } from './ordre-de-service.service';

describe('OrdreDeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdreDeServiceService = TestBed.get(OrdreDeServiceService);
    expect(service).toBeTruthy();
  });
});
