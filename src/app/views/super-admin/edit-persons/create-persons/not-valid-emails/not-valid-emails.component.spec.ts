import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotValidEmailsComponent } from './not-valid-emails.component';

describe('NotValidEmailsComponent', () => {
  let component: NotValidEmailsComponent;
  let fixture: ComponentFixture<NotValidEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotValidEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotValidEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
