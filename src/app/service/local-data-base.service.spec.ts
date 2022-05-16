import { TestBed } from '@angular/core/testing';

import { LocalDataBaseService } from './local-data-base.service';

describe('LocalDataBaseService', () => {
  let service: LocalDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
