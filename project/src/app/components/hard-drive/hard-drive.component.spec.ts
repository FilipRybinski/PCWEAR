import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardDriveComponent } from './hard-drive.component';

describe('HardDriveComponent', () => {
  let component: HardDriveComponent;
  let fixture: ComponentFixture<HardDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
