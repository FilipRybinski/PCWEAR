import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHardDriveComponent } from './search-hard-drive.component';

describe('SearchHardDriveComponent', () => {
  let component: SearchHardDriveComponent;
  let fixture: ComponentFixture<SearchHardDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHardDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHardDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
