import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPortalComponent } from './popup-portal.component';

describe('PopupPortalComponent', () => {
  let component: PopupPortalComponent;
  let fixture: ComponentFixture<PopupPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
