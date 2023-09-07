import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInformationsComponent } from './edit-user-informations.component';

describe('EditUserInformationsComponent', () => {
  let component: EditUserInformationsComponent;
  let fixture: ComponentFixture<EditUserInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserInformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
