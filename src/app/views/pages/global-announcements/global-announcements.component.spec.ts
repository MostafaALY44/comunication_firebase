import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAnnouncementsComponent } from './global-announcements.component';

describe('GlobalAnnouncementsComponent', () => {
  let component: GlobalAnnouncementsComponent;
  let fixture: ComponentFixture<GlobalAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
