import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPartComponent } from './search-part.component';

describe('SearchPartComponent', () => {
  let component: SearchPartComponent;
  let fixture: ComponentFixture<SearchPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
