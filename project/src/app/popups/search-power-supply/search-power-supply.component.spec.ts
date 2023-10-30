import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPowerSupplyComponent } from './search-power-supply.component';

describe('SearchPowerSupplyComponent', () => {
  let component: SearchPowerSupplyComponent;
  let fixture: ComponentFixture<SearchPowerSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPowerSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPowerSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
