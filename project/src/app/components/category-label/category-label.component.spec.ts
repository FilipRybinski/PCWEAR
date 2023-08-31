import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLabelComponent } from './category-label.component';

describe('CategoryLabelComponent', () => {
  let component: CategoryLabelComponent;
  let fixture: ComponentFixture<CategoryLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
