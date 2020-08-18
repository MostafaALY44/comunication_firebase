import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorContactsComponent } from './doctor-contacts.component';

describe('DoctorContactsComponent', () => {
  let component: DoctorContactsComponent;
  let fixture: ComponentFixture<DoctorContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
