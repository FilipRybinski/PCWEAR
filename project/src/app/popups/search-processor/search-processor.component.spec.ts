import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProcessorComponent } from './search-processor.component';

describe('SearchProcessorComponent', () => {
  let component: SearchProcessorComponent;
  let fixture: ComponentFixture<SearchProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProcessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
