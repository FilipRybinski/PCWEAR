import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHardDriveComponent } from './add-hard-drive.component';

describe('AddHardDriveComponent', () => {
  let component: AddHardDriveComponent;
  let fixture: ComponentFixture<AddHardDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHardDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHardDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
