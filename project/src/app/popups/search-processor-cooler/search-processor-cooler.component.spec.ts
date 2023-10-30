import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProcessorCoolerComponent } from './search-processor-cooler.component';

describe('SearchProcessorCoolerComponent', () => {
  let component: SearchProcessorCoolerComponent;
  let fixture: ComponentFixture<SearchProcessorCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProcessorCoolerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProcessorCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
