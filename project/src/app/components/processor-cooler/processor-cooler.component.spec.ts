import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorCoolerComponent } from './processor-cooler.component';

describe('ProcessorCoolerComponent', () => {
  let component: ProcessorCoolerComponent;
  let fixture: ComponentFixture<ProcessorCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorCoolerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
