import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGraphicsComponent } from './add-graphics.component';

describe('AddGraphicsComponent', () => {
  let component: AddGraphicsComponent;
  let fixture: ComponentFixture<AddGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGraphicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
