import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadLabelComponent } from './thread-label.component';

describe('ThreadLabelComponent', () => {
  let component: ThreadLabelComponent;
  let fixture: ComponentFixture<ThreadLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
