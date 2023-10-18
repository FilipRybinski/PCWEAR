import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIconCircleComponent } from './user-icon-circle.component';

describe('UserIconCircleComponent', () => {
  let component: UserIconCircleComponent;
  let fixture: ComponentFixture<UserIconCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIconCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIconCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
