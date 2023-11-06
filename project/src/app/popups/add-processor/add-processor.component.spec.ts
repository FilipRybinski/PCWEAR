import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessorComponent } from './add-processor.component';

describe('AddProcessorComponent', () => {
  let component: AddProcessorComponent;
  let fixture: ComponentFixture<AddProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
