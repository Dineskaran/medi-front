import { TestBed } from '@angular/core/testing';

import { HomeAdmistionService } from './home-admistion.service';

describe('HomeAdmistionService', () => {
  let service: HomeAdmistionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAdmistionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
