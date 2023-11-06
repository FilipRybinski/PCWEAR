import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinComponent } from './bin.component';

describe('BinComponent', () => {
  let component: BinComponent;
  let fixture: ComponentFixture<BinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
