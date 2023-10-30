import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGraphicsComponent } from './search-graphics.component';

describe('SearchGraphicsComponent', () => {
  let component: SearchGraphicsComponent;
  let fixture: ComponentFixture<SearchGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGraphicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
