import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessPartComponent } from './assess-part.component';

describe('AssessPartComponent', () => {
  let component: AssessPartComponent;
  let fixture: ComponentFixture<AssessPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
