import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementNaveComponent } from './announcement-nave.component';

describe('AnnouncementNaveComponent', () => {
  let component: AnnouncementNaveComponent;
  let fixture: ComponentFixture<AnnouncementNaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementNaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementNaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
