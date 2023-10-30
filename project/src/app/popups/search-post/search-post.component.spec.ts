import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostComponent } from './search-post.component';

describe('SearchPostComponent', () => {
  let component: SearchPostComponent;
  let fixture: ComponentFixture<SearchPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
