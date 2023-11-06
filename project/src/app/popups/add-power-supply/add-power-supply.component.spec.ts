import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPowerSupplyComponent } from './add-power-supply.component';

describe('AddPowerSupplyComponent', () => {
  let component: AddPowerSupplyComponent;
  let fixture: ComponentFixture<AddPowerSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPowerSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPowerSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
