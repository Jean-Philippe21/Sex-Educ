import { TestBed } from '@angular/core/testing';

import { VariableDeCommunicationService } from './variable-de-communication.service';

describe('VariableDeCommunicationService', () => {
  let service: VariableDeCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableDeCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
