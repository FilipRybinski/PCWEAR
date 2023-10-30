import { TestBed } from '@angular/core/testing';

import { ProcessorsService } from './processors.service';

describe('ProcessorsService', () => {
  let service: ProcessorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
