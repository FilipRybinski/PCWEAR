import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseComponent } from './add-case.component';

describe('AddCaseComponent', () => {
  let component: AddCaseComponent;
  let fixture: ComponentFixture<AddCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
