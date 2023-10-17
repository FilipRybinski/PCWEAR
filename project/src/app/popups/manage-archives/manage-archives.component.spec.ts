import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArchivesComponent } from './manage-archives.component';

describe('ManageArchivesComponent', () => {
  let component: ManageArchivesComponent;
  let fixture: ComponentFixture<ManageArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageArchivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
