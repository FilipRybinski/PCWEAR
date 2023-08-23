import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchThreadComponent } from './search-thread.component';

describe('SearchThreadComponent', () => {
  let component: SearchThreadComponent;
  let fixture: ComponentFixture<SearchThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchThreadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
