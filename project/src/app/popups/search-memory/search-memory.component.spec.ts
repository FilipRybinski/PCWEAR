import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMemoryComponent } from './search-memory.component';

describe('SearchMemoryComponent', () => {
  let component: SearchMemoryComponent;
  let fixture: ComponentFixture<SearchMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMemoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
