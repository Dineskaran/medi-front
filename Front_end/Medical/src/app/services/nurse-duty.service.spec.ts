import { TestBed } from '@angular/core/testing';

import { NurseDutyService } from './nurse-duty.service';

describe('NurseDutyService', () => {
  let service: NurseDutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseDutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
