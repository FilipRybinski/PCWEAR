import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageThreadsComponent } from './manage-threads.component';

describe('MenageThreadsComponent', () => {
  let component: MenageThreadsComponent;
  let fixture: ComponentFixture<MenageThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenageThreadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenageThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
