import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotherboardComponent } from './add-motherboard.component';

describe('AddMotherboardComponent', () => {
  let component: AddMotherboardComponent;
  let fixture: ComponentFixture<AddMotherboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotherboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMotherboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
