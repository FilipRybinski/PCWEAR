import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNavigationComponent } from './button-navigation.component';

describe('ButtonComponent', () => {
  let component: ButtonNavigationComponent
  let fixture: ComponentFixture<ButtonNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
