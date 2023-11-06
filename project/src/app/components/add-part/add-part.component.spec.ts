import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartComponent } from './add-part.component';

describe('AddPartComponent', () => {
  let component: AddPartComponent;
  let fixture: ComponentFixture<AddPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
