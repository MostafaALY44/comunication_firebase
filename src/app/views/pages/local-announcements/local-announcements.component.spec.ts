import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAnnouncementsComponent } from './local-announcements.component';

describe('LocalAnnouncementsComponent', () => {
  let component: LocalAnnouncementsComponent;
  let fixture: ComponentFixture<LocalAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
