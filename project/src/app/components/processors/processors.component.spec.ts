import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorsComponent } from './processors.component';

describe('ProcessorsComponent', () => {
  let component: ProcessorsComponent;
  let fixture: ComponentFixture<ProcessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
