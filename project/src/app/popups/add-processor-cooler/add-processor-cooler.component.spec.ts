import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessorCoolerComponent } from './add-processor-cooler.component';

describe('AddProcessorCoolerComponent', () => {
  let component: AddProcessorCoolerComponent;
  let fixture: ComponentFixture<AddProcessorCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessorCoolerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcessorCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
