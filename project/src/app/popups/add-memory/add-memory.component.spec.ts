import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemoryComponent } from './add-memory.component';

describe('AddMemoryComponent', () => {
  let component: AddMemoryComponent;
  let fixture: ComponentFixture<AddMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
