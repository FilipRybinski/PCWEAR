import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThreadComponent } from './add-thread.component';

describe('AddThreadComponent', () => {
  let component: AddThreadComponent;
  let fixture: ComponentFixture<AddThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThreadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
