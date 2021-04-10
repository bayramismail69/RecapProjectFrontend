import { TestBed } from '@angular/core/testing';

import { TokenDecorderService } from './token-decorder.service';

describe('TokenDecorderService', () => {
  let service: TokenDecorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenDecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
