import { TestBed } from '@angular/core/testing';

import { HardDriveService } from './hard-drive.service';

describe('HardDriveService', () => {
  let service: HardDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
