import { TestBed } from '@angular/core/testing';

import { LocalStrogeServiceService } from './local-stroge-service.service';

describe('LocalStrogeServiceService', () => {
  let service: LocalStrogeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStrogeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
