import { TestBed } from '@angular/core/testing';

import { MotherboardService } from './motherboard.service';

describe('MotherboardService', () => {
  let service: MotherboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotherboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
