import { TestBed } from '@angular/core/testing';

import { BankSaveService } from './bank-save.service';

describe('BankSaveService', () => {
  let service: BankSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
