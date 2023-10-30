import { TestBed } from '@angular/core/testing';

import { ProcessorCoolerService } from './processor-cooler.service';

describe('ProcessorCoolerService', () => {
  let service: ProcessorCoolerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessorCoolerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
